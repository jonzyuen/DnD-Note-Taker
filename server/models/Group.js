const { Schema, model } = require('mongoose');
const locationSchema = require('./Location');
const noteSchema = require('./Note');
const npcSchema = require('./Npc');
const pcSchema = require('./Pc');

const groupSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  users: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User'
		}
	],
	notes: [noteSchema],
  locations: [locationSchema],
	pcs: [pcSchema],
  npcs: [npcSchema]
}, {
  timestamps: true
});

const Group = model('Group', groupSchema);

module.exports = Group;