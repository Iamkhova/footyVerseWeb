const gstore = require('gstore-node')();
const Schema = gstore.Schema;

const userSchema = new Schema ({

  uuid: {type : 'string', optional: true},
  accountCreated: {type : 'string', optional: true},
  signedInTimestamp: {type : 'string', optional: true},
  userName: {type : 'string', optional: true},
  firstName: {type : 'string', optional: true},
  lastName: {type : 'string', optional: true},
  displayName: {type : 'string', optional: true},
  email: {type : 'string', optional: true},
  profilePhotoURL: {type : 'string', optional: true},
  roles: {type : 'string', optional: true},

})

module.exports = gstore.model('UserAccounts', userSchema);
