const gstore = require('gstore-node')();
const Schema = gstore.Schema;

const userSchema = new Schema ({

  uuid: {type : 'string', optional: true},
  userName: {type : 'string', optional: true},
  email : {type : 'string', optional: true},
  firstName: {type : 'string', optional: true},
  lastName: {type : 'string', optional: true},
  phoneNumber : {type : 'string', optional: true},
  streetAddress: {type : 'string', optional: true},
  city: {type : 'string', optional: true},
  state: {type : 'string', optional: true},
  postalCode: {type : 'string', optional: true},
  country: {type : 'string', optional: true},
  activeCompany: {type : 'string', optional: true}


})

module.exports = gstore.model('UserAccounts', userSchema);
