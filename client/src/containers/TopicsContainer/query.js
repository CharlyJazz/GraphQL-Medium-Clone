import gql from "graphql-tag"

export default gql`
  query {
    allTopics {
      id
      name
      description
      posts {
        id
        title
        body
        postedBy {
          id
          name
          picture
        }
      }
    }
  }
`