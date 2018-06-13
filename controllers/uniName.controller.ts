import { Router, Request, Response, NextFunction } from 'express';
import * as winston from 'winston';
import * as Auth from './externalAuthorization.controller';

class UniNameController {

  fileName: string;

  constructor() {
    this.getNewName = this.getNewName.bind(this);
    this.fileName = 'uniNameController';
  }

  getNewName(req: Request, res: Response, next: NextFunction) {
    const funcName = 'exports.getNewName';
    const uuid = req.body.uuid;
    const region = req.body.region;
    const gender = req.body.gender;
    const amount = req.body.amount;

    const generateNamePromise = this.generateName(uuid,region,gender,amount, this.fileName);
    generateNamePromise
      .then(value => {
        res.json(value);
      })
      .catch(error => {
        res.status(500).json(error);
      })


  }

  generateName(uuid: string, region: string, gender: string, amount: string, fileName: string) {
    const funcName = 'generateName';

    let url = 'https://uinames.com/api/';
    let count = 0;
    let spacer = '&';

    return new Promise(function (resolve, reject) {
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

      const uniNamesPromise = Auth.processRequest('GET', uuid, url, '');
      uniNamesPromise.then( value => {
        winston.log('info', fileName, funcName, uuid, "uniNames successfully retreived.");
        resolve(value);
      }).catch( error => {
        winston.log('error', fileName, funcName, uuid, reject, "Problem loading uniNames." , url);
        reject(error)
      })

    })
  }

}

export default new UniNameController();
