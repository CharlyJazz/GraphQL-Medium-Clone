import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Reboot from 'material-ui/Reboot/Reboot';

import Layout from '../../hoc/Layout/Layout';

// import CustomAnimatedSwitch from '../../hoc/CustomAnimatedSwitch/CustomAnimatedSwitch';

import HomeContainer from '../../containers/HomeContainer';
import AuthContainer from '../../containers/AuthContainer';
import PostsContainer from '../../containers/PostsContainer';
import SearchContainer from '../../containers/SearchContainer';
import ProfileContainer from '../../containers/ProfileContainer';
import CollectionsContainer from '../../containers/CollectionsContainer';
import TopicsContainer from '../../containers/TopicsContainer';

import './Application.css';


class Application extends Component {
  render() {
    return (
      <React.Fragment>
        <Reboot />
        <Layout> 
          {/*<CustomAnimatedSwitch>*/}
            <Route path="/"              exact component={HomeContainer}        />
            <Route path="/auth"          exact component={AuthContainer}        />
            <Route path="/posts"         exact component={PostsContainer}       />
            <Route path="/search"        exact component={SearchContainer}      />
            <Route path="/topics"        exact component={TopicsContainer}      />
            <Route path="/topics/:name"  exact component={TopicsContainer}      />
            <Route path="/profile/:name" exact component={ProfileContainer}     />
            <Route path="/collections"   exact component={CollectionsContainer} />
          {/*</CustomAnimatedSwitch> */}
        </Layout>
      </React.Fragment>
    );
  }
}

export default Application;