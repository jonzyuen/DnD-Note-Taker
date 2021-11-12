const { AuthenticationError } = require('apollo-server-express');
const { User, Group } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find()
        .populate()
    },

    // user: async (parent, { username }) => {
    //   return User.findOne({ username })
    //     .select(-__v -password)
    //     .populate('groups')
    //     .notes('notes')
    // },

    groups: async () => {
      return Group.find()
        .populate()
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

    addGroup: async (parent, args) => {
      console.log(args);
      const group = await Group.create(args);

      return group;
    },

    addLocation: async (parent, { name, description, groupId }, context) => {
      // find one group and update, 
      // push location object to locations array
      const group = await Group.findByIdAndUpdate(
        { _id: groupId },
        { $push: { locations: { name, description } } },
        { new: true }
      )
      
      return group;
    }
  }
};

module.exports = resolvers;
