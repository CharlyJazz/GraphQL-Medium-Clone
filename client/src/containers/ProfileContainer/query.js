import gql from "graphql-tag"

export default gql`
  query($username: String!, $quantity: Int!) {
    searchUser(username: $username) {
    username
    bio
    picture
    last_name
    first_name
    count(resources:[
      "posts",
      "comments"
      "collections"
      "claps"
      "bookmarks"
    ]) {
      posts
      comments
      collections
      claps
      bookmarks
    }

    collections(last: $quantity) {
      id
      title
      description
      picture
    }

		comments(last: $quantity) {
      id
      body
      post {
        id
        title
      }
    }
    
    bookmarks(last: $quantity) {
      id
      post {
        id
        title
      }
    }
    
    posts(last: $quantity) {
      title
    }
    
    claps(last: $quantity) {
      post {
        title
      }
    }
  }
}
`