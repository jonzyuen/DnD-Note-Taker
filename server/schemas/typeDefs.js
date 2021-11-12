const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    groups: [Group]
  }

  type Group {
    _id: ID!
    name: String!
    users: [User]
    notes: [Note]
    locations: [Location]
  }

  type Note {
    _id: ID!
    title: String!
    noteText: String!
    createdAt: String!
  }

  type Location {
    _id: ID!
    name: String!
    description: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    addGroup(name: String!): Group
    addLocation(name: String!, description: String, groupId: ID!): Group
    joinGroup(userid and groupid): 
  }

  type Query {
    groups: [Group]
    group(_id: ID): Group
    locations: [Location]
    location: Location
    users(_id: ID): User
  }

  
`;

module.exports = typeDefs;

// mutations
// login(email: String!, password: String!): Auth
// addGroup()
//     addPc()
//     addNote()
//     addLocation()
//     addNpc()