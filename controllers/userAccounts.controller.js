
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


exports.loadUserByUUID = function(req, res){
  const funcName = 'loadUserByUUID';
  const uuid = req.body.uuid;

  const findUserPromise = findUserByUUID({uuid: uuid}, uuid);
  findUserPromise
    .then ( resolve => {
      res.json(resolve);
    })
    .catch ( reject => {
      res.status(500).json(reject);
    })

}

exports.roleCheck = function(req, res) {
  const uuid = req.body.uuid;
  const role = req.body.role;
  const state = {state : ''};

  const findUserPromise = findUserByUUID({uuid: uuid}, uuid);
  findUserPromise
    .then ( resolve => {
      let roleFound = false;
      state.state = roleFound;
      const userRoles = JSON.parse(resolve['roles']);
        for (let i = 0; i < userRoles.length; i++) {
          for (let z = 0; z < role.length; z++) {
            if ( userRoles[i] === role[z])
            {
              roleFound = true;
              state.state = roleFound;
            }
          }
        }

        res.json(state);

      })
    .catch ( reject => {
      res.status(500).json(false);
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

  const findUserPromise = findUserByUUID({uuid: uuid}, uuid);
  findUserPromise
    .then( user => {

      // Unpack Roles to JSON
      if (typeof(user.entityData.roles) !== 'undefined') {
        user.entityData.roles = JSON.parse(user.entityData.roles);
      }

      const updateUserPromise = updateUser(req.body);
      updateUserPromise.then( resolve => {
        res.json(user.entityData);
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
 * Find User By ID
 * @param _query
 * @param _uuid
 * @returns {Promise<any>}
 */
let findUserByUUID = function(_query, _uuid){
  return new Promise(function (resolve,reject) {

    const funcName = 'findUserByUUID';

    // query example {uuid: uuid}
    User.findOne(_query)
      .then((entity) => {
        winston.log('info', fileName, funcName, _uuid, "User Found");
        resolve(entity);
      })
      .catch((error) => {
        winston.log('info', fileName, funcName, _uuid, "No User Found. Creating New User");
        reject(error);
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


