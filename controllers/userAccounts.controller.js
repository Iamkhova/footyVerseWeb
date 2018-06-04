
const fileName = 'userAccounts.controller.js';
const winston=require('winston')
const gstore = require('gstore-node')();
const User = require('../models/user.model');
const Datastore = require('@google-cloud/datastore');
const datastore = new Datastore({ projectId: process.env.GCLOUD_PROJECT});
gstore.connect(datastore);
console.log('UserAccount Controller Loading');
/**
 * Create User Account
 * @param req
 * @param res
 */
exports.createUser = function(req,res){
  const funcName = 'createUser';
  const uuid = req.body.uuid;

  const createUserPromise = createNewUser(req.body);
  createUserPromise.then( resolve => {
    res.json(resolve);
  }).catch( reject => {
    res.status(500).json(message);
  })
}

/**
 * Handle Social Login
 * @param req
 * @param res
 */
exports.handleSocialLogin = function(req, res){
  const funcName = 'handleSocialLogin';
  const uuid = req.body.uuid;

  User.findOne({ uuid: uuid})
    .then((entity) => {
      // Update User
      const updateUserPromise = updateUser(req.body);
      updateUserPromise.then( resolve => {
        res.json(resolve);
      }).catch( reject => {
        res.status(500).json(reject);
      })
    })
    .catch((error) => {
      winston.log('info', fileName, funcName, uuid, "No User Found. Creating New User");

      const createUserPromise = createNewUser(req.body);
      createUserPromise.then( resolve => {
        res.json(resolve);
      }).catch( reject => {
        res.status(500).json(reject);
      })
    })
}

/**
 * Handle User Update Request
 * @param req
 * @param res
 */
exports.handleUserUpdate = function(req,res){
  const funcName = 'handleUserUpdate';
  const uuid = req.body.uuid;

  const updateUserPromise = updateUser(req.body);
  updateUserPromise.then( resolve => {
    res.json(resolve);
  }).catch( reject => {
    res.status(500).json(reject);
  })

}

/**
 * Create New User Function
 * @param user
 * @returns {Promise<any>}
 */
let createNewUser = function(user) {
  return new Promise(function (resolve,reject) {

    const funcName = 'createNewUser';
    const uuid = user.uuid;

    const userEntity = new User(user, user.uuid);

    userEntity.save()
      .then((entity) => {
        winston.log('info', fileName, funcName, uuid, "User Account saved.");
        resolve(entity)
      })
      .catch((err) => {
        const message = '[ERROR] - account_userprofile_create : ' + err;
        reject(message)
      })

  })
}

/**
 * Update User Information
 * @param user
 * @returns {Promise<any>}
 */
let updateUser = function(user) {
  const funcName = 'updateUser';
  const uuid = user.uuid;

  return new Promise(function (resolve,reject) {
    User.update(user.uuid, user)
      .then((entity) => {
        winston.log('info', fileName, funcName, uuid, "User Account updated!");
        resolve(entity);
      })
      .catch((err) => {
        winston.log('error', fileName, funcName, uuid, err, "Update User Failed.");
        reject(err);
      })
  })
}


