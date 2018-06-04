import gql from "graphql-tag"

export default gql`
  mutation signInUser($email: String!, $password: String!) {
    signInUser(
      credentials: {
        password: $password
        email: $email
      }
    ) {
      token
      user {
        id
        username
        picture
      }
    }
  }
`