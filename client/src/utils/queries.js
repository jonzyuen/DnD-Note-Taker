import { gql } from '@apollo/client';

export const QUERY_GROUPS = gql`
  query groups {
    groups {
      _id
      name
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