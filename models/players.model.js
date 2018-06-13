const gstore = require('gstore-node')();
const Schema = gstore.Schema;

const playersSchema = new Schema ({

  uuid: {type : 'string', optional: true},
  firstName: {type : 'string', optional: true},
  lastName: {type : 'string', optional: true},
  position: {type : 'string', optional: true},
  rating: {type : 'number', optional: true},
  injured: {type : 'boolean', optional: true},
  skillPassing: {type : 'number', optional: true},
  skillShooting: {type : 'number', optional: true},
  skillTackling: {type : 'number', optional: true},
  skillSaving: {type : 'number', optional: true},
  skillAgility: {type : 'number', optional: true},
  skillPenaltyTaking: {type : 'number', optional: true},
  skillJumping: {type : 'number', optional: true},

})
