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
  query group($_id: ID!) {
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

// export const QUERY_NOTES = gql`
//   query Notes {
//     notes {
//       _id
//       title
//       noteText  
//       createdAt
//     }
//   }
// `;

export const QUERY_NOTES = gql`
  query Notes($_id: ID) {
    group {
      name
      notes (_id: $_id) {
        _id
        title
        noteText
      }
    }
  }
`;

export const QUERY_NOTE = gql`
  query Note($_id: ID) {
    group {
      name
      note (_id: $_id){
        _id
        title
        noteText
      }
    }
  }
`;

// export const QUERY_NOTE = gql`
//   query Note($_id: ID!) {
//     note(_id: $_id) {
//       _id
//       title
//       noteText
//       createdAt
//     }
//   }
// `;

// export const QUERY_NOTE = gql`
//   query Note ($_id: ID!, $_id: ID!) {
//     group(_id: $_id) {
//       name
//       note(_id: $_id) {
//         _id
//         title
//         noteText
//         createdAt
//       }
//     }
//   }
// `;
