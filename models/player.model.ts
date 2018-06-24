import * as GstoreNode from 'gstore-node';
const gstore = GstoreNode();
const { Schema } = gstore;

export interface IPlayer {
  uuid?: string;
  firstName?: string;
  lastName?: string;
  position?: string;
  rating?: number;
  injured?: boolean;
  skillPassing?: number;
  skillShooting?: number;
  skillTackling?: number;
  skillSaving?: number;
  skillAgility?: number;
  skillPenaltyTaking?: number;
  skillJumping?: number;
  skillStrength?: number;

}

const playersSchema = new Schema<IPlayer> ({

  uuid: { type: String, optional: true},
  firstName: {type : String, optional: true},
  lastName: {type : String, optional: true},
  position: {type : String, optional: true},
  rating: {type : Number, optional: true},
  injured: {type : Boolean, optional: true},
  skillPassing: {type : Number, optional: true},
  skillShooting: {type : Number, optional: true},
  skillTackling: {type : Number, optional: true},
  skillSaving: {type : Number, optional: true},
  skillAgility: {type : Number, optional: true},
  skillPenaltyTaking: {type : Number, optional: true},
  skillJumping: {type : Number, optional: true},
  skillStrength: {type : Number, optional: true},

})

export const PlayerModel = gstore.model<IPlayer>('Players', playersSchema);
