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
    npcs: [Npc]
    pcs: [Pc]
  }

  type Note {
    _id: ID!
    title: String!
    noteText: String!
    createdAt: String!
    groups: [Group]
  }

  type Location {
    _id: ID!
    name: String!
    description: String
  }

  type Npc {
    _id: ID!
    name: String!
    description: String
  }

  type Pc {
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
    login(email: String!, password: String!): Auth
    addGroup(name: String!): Group
    addLocation(name: String!, groupId: ID!, description: String): Group
    addNpc(name: String!, groupId: ID!): Group
    joinGroup(userId: ID!, groupId: ID!): Group
    addPc(name: String!, groupId: ID!): Group
    addNote(title: String!, groupId: ID!, noteText: String!): Group
  }

  type Query {
    groups: [Group]
    group(_id: ID): Group
    locations: [Location]
    location: Location
    users: [User]
    user(_id: ID): User
    note(_id: ID): Note
    notes: [Note]
  }
`;

module.exports = typeDefs;

// possible to do
// logout
// delete notes, locations, npcs, etc
