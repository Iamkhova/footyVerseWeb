import {IPlayer} from "../interfaces/player.interface";

const fileName = 'playerManagement.controller.js';
const winston=require('winston')
const gstore = require('gstore-node')();
const User = require('../models/user.model');
const Datastore = require('@google-cloud/datastore');
const datastore = new Datastore({ projectId: process.env.GCLOUD_PROJECT});
const UniNames = require('./uniNames.controller');
gstore.connect(datastore);

exports.createRandomPlayer = function(req,res) {
  const funcName = 'createRandomPlayer';
  const uuid = req.body.uuid;
  const region = req.body.region;
  const gender = req.body.gender;
  const amount = req.body.amount;

}

let createPlayer = function(uuid) {

  let playerName = '';
  const player  = IPlayer;

  return new Promise(function (resolve, reject) {

    const generateNamePromise = UniNames.generateName(uuid,region,gender,amount);
    generateNamePromise
      .then (value => {
        playerName = value;
      })
      .catch (error => {
      })






  })

}

