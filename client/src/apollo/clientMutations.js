import gql from "graphql-tag";

export const SET_CURRENT_USER = gql`
  mutation setCurrentUser(
    $id: ID!,
    $token: String!,
    $username: String!,
    $picture: String!
  ) {
    setCurrentUser(
      id: $id
      token: $token
      username: $username
      picture: $picture
    ) @client
  }
`