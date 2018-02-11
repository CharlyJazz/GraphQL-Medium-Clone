import React, { Component } from 'react';
//import Typography from 'material-ui/Typography/Typography';
//import gql from 'graphql-tag';
//import { graphql } from 'react-apollo';
//import { withStyles } from 'material-ui/styles';
import PaperCenter from '../../components/UI/PaperCenter/PaperCenter';
import ProfileHeader from './profileHeader';
import ProfileCounts from './profileCounts';
import ProfileTabs from './profileTabs';
import Divider from 'material-ui/Divider/Divider';
//import Typography from 'material-ui/Typography/Typography';
//import Avatar from 'material-ui/Avatar/Avatar';

class ProfileContainer extends Component {
  state = {}
  render() {
    return ( 
      <PaperCenter>
        <ProfileHeader
          userName='Draw & Code'
          userBio='Draw & Code is where geekery manifests itself at fintech startup Maxwell Forest. Here you will find tips, tricks and tales from our engineers and designers.'/>
        <ProfileCounts
          posts={6}
          comments={12}
          claps={24}
          collections={4}
          bookmarks={15}/>
        <Divider/>
        <ProfileTabs/>
      </PaperCenter>
     )
  }
}
 
export default ProfileContainer;
