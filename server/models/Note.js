const { Schema } = require('mongoose');

const noteSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  noteText: {
    type: String,
    required: true
  }
}, {
	timestamps: true
});

module.exports = noteSchema;

// url.com/groupid/npcid

// @location
// #pc
// $npc