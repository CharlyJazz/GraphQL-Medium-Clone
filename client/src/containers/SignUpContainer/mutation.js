import gql from "graphql-tag"

export default gql`
  mutation createUser(
    $username: String!,
    $first_name: String!,
    $last_name: String!,
    $password: String!,
    $email: String!,
    $bio: String
  ) {
    createUser(
      username: $username
      first_name: $first_name
      last_name: $last_name
      credentials: {
        password: $password
        email: $email
      }
      bio: $bio
    ) {
      id
    }
  }
`