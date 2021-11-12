const { Schema } = require('mongoose');

const locationSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = locationSchema;

// groups are made of users and notes
// notes are texts with links

// location example
// Name: Grand Canyon
// NPCs associated: Jane, Greg
// Characters associated: Nate
// Description: lorem ipsum blah blah #Jane was here, #Greg was also here blah
// We came here from @Arizona with $Nate

// pc pc and location is tied to group id so make sure that includes
// can add authentication later
// will use push
