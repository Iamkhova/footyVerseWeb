const gstore = require('gstore-node')();
const Schema = gstore.Schema;

const playersSchema = new Schema ({

  uuid: {type : 'string', optional: true},
  firstName: {type : 'string', optional: true},
  lastName: {type : 'string', optional: true},
  position: {type : 'string', optional: true},
  rating: {type : 'number', optional: true},
  injured: {type : 'boolean', optional: true},
  currentSkills: {type : 'string', optional: true},

})
