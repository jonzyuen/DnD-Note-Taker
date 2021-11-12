const { AuthenticationError } = require('apollo-server-express');
const { User, Group } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find()
        .populate('groups')
    },

    user: async (parent, { username }) => {
      return User.findOne({ username })
        .populate('groups')
    },

    groups: async () => {
      return Group.find()
        .populate('users')
    },

    group: async (parent, { _id }) => {
      return await Group.findOne({ _id })
        .populate('users')
    },

    locations: async () => {
      return Group.find()
        .populate('locations')
    }
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
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

      return { token, user }
    },

    addGroup: async (parent, args) => {
      console.log(args);
      const group = await Group.create(args);

      return group;
    },

    addLocation: async (parent, { name, description, groupId }) => {
      // find one group and update, 
      // push location object to locations array
      const group = await Group.findByIdAndUpdate(
        { _id: groupId },
        { $addToSet: { locations: { name, description } } },
        { new: true }
      )
      
      return group;
    },

    addNpc: async (parent, { name, description, groupId }) => {
      // find one group and update, 
      // push location object to locations array
      const npc = await Group.findByIdAndUpdate(
        { _id: groupId },
        { $addToSet: { npcs: { name, description } } },
        { new: true }
      )
      
      return npc;
    },

    addPc: async (parent, { name, description, groupId }) => {
      // find one group and update, 
      // push location object to locations array
      const pc = await Group.findByIdAndUpdate(
        { _id: groupId },
        { $addToSet: { pcs: { name, description } } },
        { new: true }
      )
      
      return pc;
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

      return group;
    }, 

    addPc: async (parent, { name, description, groupId }) => {
      // find one group and update, 
      // push location object to locations array
      const pc = await Group.findByIdAndUpdate(
        { _id: groupId },
        { $addToSet: { pcs: { name, description } } },
        { new: true }
      )
      
      return pc;
    }
  }
};

module.exports = resolvers;
