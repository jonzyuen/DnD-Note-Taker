import { gql } from '@apollo/client';

export const QUERY_GROUPS = gql`
  query groups {
    groups {
      _id
      name
    }
  }
`;

export const QUERY_GROUP = gql`
  query group($_id: ID) {
    group(_id: $_id) {
      _id
      name
      users {
        _id
        name
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($_id: ID!) {
    user(_id: $_id) {
      _id
      name
      email
      groups {
        _id
        name
      }
    }
  }
`;

export const QUERY_USERS = gql`
  query Users {
    users {
      name
      _id
      email
      groups {
        _id
        name
      }
    }
  }
`;