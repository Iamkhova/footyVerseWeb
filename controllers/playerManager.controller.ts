import { Router, Request, Response, NextFunction } from 'express';
import * as winston from 'winston';
import * as GstoreNode from 'gstore-node';
import * as Datastore from '@google-cloud/datastore';
import {IPlayer} from "../models/player.model";
import {UniNameController} from "./uniName.controller";
import {PlayerModel} from "../models/player.model";
import { Guid } from "guid-typescript";

const datastore = new Datastore({ projectId: process.env.GCLOUD_PROJECT});
const gstore = GstoreNode();
gstore.connect(datastore);

class PlayerManagerController {

  private fileName: string;

  constructor() {
    this.createRandomPlayer = this.createRandomPlayer.bind(this);
    this.fileName = 'playerManger.controller.ts';
  }

  createRandomPlayer(req: Request, res: Response, next: NextFunction) {
    const funcName = 'createRandomPlayer';
    const uuid = req.body.uuid;
    const region = req.body.region;
    const gender = req.body.gender;
    const amount = req.body.amount;

    const createPlayerPromise = this.createPlayer(uuid, region, gender, amount);
    createPlayerPromise
      .then( value => {
        const savePlayerToDBPromise = this.savePlayerToDB(value);
        savePlayerToDBPromise
          .then(entity => {
            res.json(entity)
          })
          .catch( error=> {
            res.status(500).json(error)
          })
      })
      .catch( error => {
        res.status(500).json(error)
      })
  }

 private savePlayerToDB(player: IPlayer) {
    return new Promise(function (resolve, reject) {

      const playerEntity = new PlayerModel(player, player.uuid);

      playerEntity.save()
        .then(entity => {
          resolve(entity)
        })
        .catch(error => {
          reject(error)
        })
    })
 }

 private createPlayer(uuid: string, region: string, gender: string, amount: string) {
    let playerName = '';
    const player : IPlayer = {};

    return new Promise(function (resolve, reject) {

      // Get Player's Name & SKills
      const generateNamePromise = UniNameController.prototype.generateName(uuid, region, gender, amount, '')
      generateNamePromise
        .then( value  => {
          playerName = value['data']['name'] + ' ' + value['data']['surname'];
          player.firstName = value['data']['name'];
          player.lastName = value['data']['surname'];
          player.skillAgility = PlayerManagerController.getRandom(0, 99);
          player.skillJumping = PlayerManagerController.getRandom(0, 99);
          player.skillPenaltyTaking = PlayerManagerController.getRandom(0, 99);
          player.skillPassing = PlayerManagerController.getRandom(0, 99);
          player.skillSaving = PlayerManagerController.getRandom(0, 99);
          player.skillShooting = PlayerManagerController.getRandom(0, 99);
          player.skillTackling = PlayerManagerController.getRandom(0, 99);
          player.skillStrength = PlayerManagerController.getRandom(0, 99);
          player.rating = PlayerManagerController.getRating(player);
          player.uuid = Guid.create().toString();
          winston.log('info', uuid, "Player Created.", player);
          resolve(player);

        })
        .catch( error => {
          winston.log('error', uuid, error, "Error generating player name.");
          reject(error);
        })

    })
  }

  private static getRandom(_min: number, _max: number)  {
    return Math.floor(Math.random() * (_max - _min + 1)) + _min;
  }

  private static getRating(player: IPlayer): number {
    let rating: number;

    rating = Math.floor((player.skillTackling + player.skillShooting + player.skillPenaltyTaking+ player.skillAgility +
      player.skillJumping+ player.skillSaving+ player.skillStrength + player.skillPassing) / 8);

    return rating;
  }



}

export default new PlayerManagerController();
