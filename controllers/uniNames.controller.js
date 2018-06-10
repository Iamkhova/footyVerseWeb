const fileName = 'uniNames.controller.js';
const winston=require('winston');
const Raven = require('raven');
const auth = require('./externalAuthorization.controller');

exports.getNewName = function(req, res){
  const funcName = 'exports.getNewName';
  const uuid = req.body.uuid;
  const url = 'https://uinames.com/api/';
  const uniNamesPromise = auth.processRequest('GET', uuid, url, '', res);
  uniNamesPromise.then( resolve => {
    winston.log('info', fileName, funcName, uuid, "uniNames successfully retreived.");
    res.json(resolve);
  }).catch( reject => {
    winston.log('error', fileName, funcName, uuid, reject, "Problem loading uniNames.");
    res.status(500).json(reject);
  })
}

