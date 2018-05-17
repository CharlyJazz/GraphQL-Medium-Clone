import gql from "graphql-tag"

export default gql`
  mutation createUser($name: String!, $password: String!, $email: String!, $bio: String) {
    createUser(
      name: $name
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