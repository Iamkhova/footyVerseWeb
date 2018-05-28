const gstore = require('gstore-node')();
const User = require('../models/user.model');
const Datastore = require('@google-cloud/datastore');
const datastore = new Datastore({ projectId: process.env.GCLOUD_PROJECT});
gstore.connect(datastore);

/**
 * Create User Account
 * @param req
 * @param res
 */
exports.createUser = function(req,res){

  const userEntity = new User(req.body, req.body.uuid);

  userEntity.save()
    .then((entity) => {
      res.json(entity);
    })
    .catch((err) => {
      const message = '[ERROR] - account_userprofile_create : ' + err;
      console.error(message);
      res.status(500).json(message);
    })
}
