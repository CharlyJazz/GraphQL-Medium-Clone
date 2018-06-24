import React from 'react'
import { ApolloConsumer } from 'react-apollo'
import { Redirect } from 'react-router-dom'
import removeCurrentUser from '../../shared/removeCurrentUser'

// Thanks Ben Awad https://www.youtube.com/watch?v=9gm3w-Oo_us

const LogoutContainer = () => (
  <ApolloConsumer>
    {
      client => {
        client.resetStore();
        removeCurrentUser();
        return <Redirect to='/'/>
      }
    }
  </ApolloConsumer>
)

export default LogoutContainer