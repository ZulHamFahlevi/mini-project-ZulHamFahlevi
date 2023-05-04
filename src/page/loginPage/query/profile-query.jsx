import { gql } from "@apollo/client";

const GET_PROFILE = gql`
  query profile {
    profile {
      username
      password
      isAdmin
    }
  }
`;

const ADD_PROFILE = gql`
  mutation profile($object: profile_insert_input!) {
    insert_profile_one(object: $object) {
      uuid
      username
    }
  }
`;

export { GET_PROFILE, ADD_PROFILE };
