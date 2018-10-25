import React, { Component } from 'react'
import getCurrentUser from '../shared/getCurrentUser'
import { graphql, compose } from 'react-apollo'
import { SET_CURRENT_USER } from '../apollo/clientMutations'
import { GET_CURRENT_USER } from '../apollo/clientQueries'
import Grid from 'material-ui/Grid/Grid'
import Header from '../components/Navegation/Header/Header'
import { Switch, Route } from 'react-router-dom';
import Home from '../containers/HomeContainer'
import Auth from '../containers/AuthContainer'
import Post from '../containers/PostContainer'
import Search from '../containers/SearchContainer'
import Profile from '../containers/ProfileContainer'
import Collections from '../containers/CollectionsContainer'
import Topics from '../containers/TopicsContainer'
import NewPost from '../containers/NewPostContainer'
import Logout from '../containers/LogoutContainer'

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
    const { currentUser, loading } = this.props.getCurrentUser
    return (
      <React.Fragment>
        <Header
          loading={loading}
          currentUser={currentUser}
        />
        <main style={{ paddingLeft: 20, paddingRight: 20 }}>
          <Grid container spacing={0}>
            <Switch>
              <Route path='/' component={Home} exact />
              <Route path='/logout' component={Logout} />
              <Route path='/auth' component={Auth} />
              <Route path='/post/:id' component={Post} />
              <Route path='/search' component={Search} />
              <Route path='/profile/:name' component={Profile} />
              <Route path='/topics/:name' component={Topics} />
              <Route path='/topics' component={Topics} />
              <Route path='/collections' component={Collections} />
              <Route path='/write/post' component={NewPost} />
            </Switch>
          </Grid>
        </main>
      </React.Fragment>
    )
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
