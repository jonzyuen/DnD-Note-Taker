const { AuthenticationError } = require('apollo-server-express');
const { User, Group, Note } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return await User.find()
        .populate('groups')
    },

    user: async (parent, { _id }) => {
      return await User.findOne({ _id })
        .populate('groups')
    },

    groups: async () => {
      return await Group.find()
        .populate('users')
    },

    group: async (parent, { _id }) => {
      return await Group.findOne({ _id })
        .populate('users')
        .populate('notes');
        // finish populating other pages
    },

    locations: async () => {
      return await Group.find()
        .populate('locations')
    },

    note: async (parent, { _id }) => {
      return await Note.findOne({ _id })
        .populate('notes')
    },

    // notes: async (parent, { _id }) => {
    //   return await Note.find()
    //     .populate('notes')
    // }, 

    notes: async () => {
      return await Note.find()
        .populate('notes')
    }


    // notes: async (parent, { _id }) => {
    //   const groupId = parent._id
    //   return await Note.find(groupId)
    //     .populate('notes')
    // },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return await { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticatoinError('Incorrect email');
      }

      const correctPassword = await user.isCorrectPassword(password);

      if (!correctPassword) {
        throw new AuthenticationError('Incorrect password')
      }

      const token = signToken(user);

      return await { token, user }
    },

    addGroup: async (parent, args) => {
      const group = await Group.create(args);

      return await group;
    },

    addLocation: async (parent, { name, description, groupId }) => {
      // find one group and update, 
      // push location object to locations array
      const group = await Group.findByIdAndUpdate(
        { _id: groupId },
        { $addToSet: { locations: { name, description } } },
        { new: true }
      )

      return await group;
    },

    addNpc: async (parent, { name, description, groupId }) => {
      // find one group and update, 
      // push location object to locations array
      const npc = await Group.findByIdAndUpdate(
        { _id: groupId },
        { $addToSet: { npcs: { name, description } } },
        { new: true }
      )

      return await npc;
    },

    addPc: async (parent, { name, description, groupId }) => {
      // find one group and update, 
      // push location object to locations array
      const pc = await Group.findByIdAndUpdate(
        { _id: groupId },
        { $addToSet: { pcs: { name, description } } },
        { new: true }
      )

      return await pc;
    },

    joinGroup: async (parent, { userId, groupId }) => {
      const group = await Group.findByIdAndUpdate(
        { _id: groupId },
        { $addToSet: { users: userId } },
        { new: true }
      )

      const user = await User.findByIdAndUpdate(
        { _id: userId },
        { $addToSet: { groups: groupId } },
        { new: true }
      )

      return await group;
    },

    addNote: async (parent, { title, noteText, groupId }) => {
      const note = await Group.findByIdAndUpdate(
        { _id: groupId },
        { $addToSet: { notes: { title, noteText } } },
        { new: true }
      )

      return await note;
    }
  }
};

module.exports = resolvers;
