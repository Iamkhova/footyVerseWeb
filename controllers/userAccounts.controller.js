const Datastore = require('@google-cloud/datastore');
const gstore = require('gstore-node');
const datastore = Datastore();
const User = require('../models/user.model');

exports.createUser = function(req,res){
  const entityData = User.sanitize(req.body);
  console.log('pass1');
  const entityID = req.body.uuid;
  console.log('pass2');
  console.log('uuid', entityID);
  const user = new User(entityData, entityID);
  console.log('pass3');

  user.save()
    .then((entity) => {
      res.json(entity);
    })
    .catch((err) => {
      const message = '[ERROR] - account_userprofile_create : ' + err;
      console.error(message);
      res.status(500).json(message);
    })
}
