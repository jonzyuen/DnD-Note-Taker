const { Schema, model } = require('mongoose');
const locationSchema = require('./Location');
const noteSchema = require('./Note');

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
	// pcs: [],
  // npcs: []
}, {
  timestamps: true
});

const Group = model('Group', groupSchema);

module.exports = Group;