import gql from "graphql-tag"

export default gql`
  mutation createPost($title: String!, $body: String!, $picture: String!, $topicId: ID!) {
    createPost(
      title: $title
      body: $body
      picture: $picture
      topicId: $topicId
    ) {
      id
      title
    }
  }
`