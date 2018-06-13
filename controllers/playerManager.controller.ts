import { Router, Request, Response, NextFunction } from 'express';
import * as Winston from 'winston';
import * as gstore from 'gstore-node';
import * as Datastore from '@google-cloud/datastore';
import {IPlayer} from '../interfaces/player.interface';
import * as UniNames from './uniNames.controller';

class PlayerManagerController {


  constructor() {
    this.createRandomPlayer = this.createRandomPlayer.bind(this);
  }

  createRandomPlayer(req: Request, res: Response, next: NextFunction) {
    const funcName = 'createRandomPlayer';
    const uuid = req.body.uuid;
    const region = req.body.region;
    const gender = req.body.gender;
    const amount = req.body.amount;
  }

  createPlayer(uuid: String, region: string, gender: string, amount: string) {
    let playerName = '';
    const player : IPlayer = {};

    return new Promise(function (resolve, reject) {

      const generateNamePromise = UniNames.generateName(uuid, region, gender, amount)
    })
  }

}

export default new PlayerManagerController();
