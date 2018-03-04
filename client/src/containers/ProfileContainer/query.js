import gql from "graphql-tag"

// Search user data
export default gql`
  query($name: String!, $quantity: Int!) {
    searchUser(name: $name) {
    name
    bio
    picture
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