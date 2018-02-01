import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import Layout from '../../hoc/Layout/Layout';
import CustomAnimatedSwitch from '../../hoc/CustomAnimatedSwitch/CustomAnimatedSwitch';

import HomeContainer from '../../containers/HomeContainer';
import AuthContainer from '../../containers/AuthContainer';
import PostsContainer from '../../containers/PostsContainer';
import SearchContainer from '../../containers/SearchContainer';
import ProfileContainer from '../../containers/ProfileContainer';
import CollectionsContainer from '../../containers/CollectionsContainer';


class Application extends Component {
  render() {
    return (
      <Layout> 
        <CustomAnimatedSwitch>
          <Route path="/"            exact component={HomeContainer}        />
          <Route path="/auth"        exact component={AuthContainer}        />
          <Route path="/posts"       exact component={PostsContainer}       />
          <Route path="/search"      exact component={SearchContainer}      />
          <Route path="/profile"     exact component={ProfileContainer}     />
          <Route path="/collections" exact component={CollectionsContainer} />
          <Redirect to="/" />
        </CustomAnimatedSwitch>
      </Layout>
    );
  }
}

export default Application;