const fileName = 'playerManagement.controller.js';
const winston=require('winston')
const gstore = require('gstore-node')();
const User = require('../models/user.model');
const Datastore = require('@google-cloud/datastore');
const datastore = new Datastore({ projectId: process.env.GCLOUD_PROJECT});
gstore.connect(datastore);

exports.createRandomPlayer = function(req,res) {
  const funcName = 'createRandomPlayer';
  const uuid = req.body.uuid;


}

