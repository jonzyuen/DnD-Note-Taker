import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      token
      user {
        _id
        name
        email
      }
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
        email
      }
    }
  }
`;

export const ADD_GROUP = gql`
  mutation addGroup($name: String!) {
    addGroup(name: $name) {
      _id
      name
    }
  }
`;

export const ADD_LOCATION = gql`
  mutation addLocation($name: String!, $groupId: ID!, $description: String) {
    addLocation(name: $name, groupId: $groupId, description: $description) {
      _id
      name
    }
  }
`;

export const ADD_NPC = gql`
  mutation addNpc($name: String!, $groupId: ID!) {
    addNpc(name: $name, groupId: $groupId) {
      _id
      name
    }
  }
`;

export const JOIN_GROUP = gql`
  mutation joinGroup($userId: ID!, $groupId: ID!) {
    joinGroup(userId: $userId, groupId: $groupId) {
      _id
      name
    }
  }
`;

export const ADD_PC = gql`
  mutation addPc($name: String!, $groupId: ID!) {
    addPc(name: $name, groupId: $groupId) {
      _id
      name
    }
  }
`;

export const ADD_NOTE = gql`
  mutation addNote($title: String!, $groupId: ID!, $noteText: String!) {
    addNote(title: $title, groupId: $groupId, noteText: $noteText) {
      _id
      name
    }
  }
`;