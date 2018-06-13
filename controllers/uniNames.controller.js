const fileName = 'uniNames.controller.js';
const winston=require('winston');
const Raven = require('raven');
const auth = require('./externalAuthorization.controller');

exports.getNewName = function(req, res){
  const funcName = 'exports.getNewName';
  const uuid = req.body.uuid;
  const region = req.body.region;
  const gender = req.body.gender;
  const amount = req.body.amount;
  let url = 'https://uinames.com/api/';
  let count = 0;
  let spacer = '&';


  if (typeof(region) !== 'undefined'){
    if (count < 1) { spacer = '?'} else {spacer = '&'}
    url = url + spacer + 'region=' + region ;
    count = count +  1;
  }

  if(typeof(gender) !== 'undefined'){
    if (count < 1) { spacer = '?'} else {spacer = '&'}
    url = url + spacer + 'gender=' + gender ;
    count = count +  1;
  }

  if(typeof(amount) !== 'undefined'){
    if (count < 1) { spacer = '?'} else {spacer = '&'}
    url = url + spacer + 'amount=' + amount;
    count = count +  1;
  }


  const uniNamesPromise = auth.processRequest('GET', uuid, url, '', res);
  uniNamesPromise.then( resolve => {
    winston.log('info', fileName, funcName, uuid, "uniNames successfully retreived.");
    res.json(resolve);
  }).catch( reject => {
    winston.log('error', fileName, funcName, uuid, reject, "Problem loading uniNames." , url);
    res.status(500).json(reject);
  })
}

