import { gql } from '@apollo/client';

export const GROUPS = gql`
  query groups {
    groups {
      _id
      name
    }
  }
`;