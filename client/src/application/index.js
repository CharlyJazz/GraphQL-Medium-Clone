import React, { Component } from 'react'
import getCurrentUser from '../shared/getCurrentUser'
import { graphql, compose } from 'react-apollo'
import { SET_CURRENT_USER } from '../apollo/clientMutations'
import { GET_CURRENT_USER } from '../apollo/clientQueries'

class Application extends Component {
  componentWillReceiveProps(nextProps) {
    /*
    * Prevent call mutation before the client
    * get the graphql schema:
    * First call a query, then wait...
    * And then call the mutation
    */
    const currentUser = getCurrentUser()
    if (nextProps.getCurrentUser.loading === false && currentUser !== false) {
      this.props.setCurrentUser({
        variables: currentUser
      }).then((response) => {

      }).catch(err => console.warn(err))
    }
  }

  render() {
    return null
  }
}

export default compose(
  graphql(SET_CURRENT_USER, {
    name: 'setCurrentUser'
  }),
  graphql(GET_CURRENT_USER, {
    name: 'getCurrentUser'
  })
)(Application)
