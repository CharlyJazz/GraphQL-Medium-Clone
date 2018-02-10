import React, { Component } from 'react';
//import Grid from 'material-ui/Grid/Grid';
//import Typography from 'material-ui/Typography/Typography';
//import gql from 'graphql-tag';
//import { graphql } from 'react-apollo';
//import { withStyles } from 'material-ui/styles';
import PaperCenter from '../../components/UI/PaperCenter/PaperCenter';
import Typography from 'material-ui/Typography/Typography';

class ProfileContainer extends Component {
  state = {}
  render() {
    return ( 
      <PaperCenter>
        <Typography type="title">
          Charlyjazz
        </Typography>
      </PaperCenter>
     )
  }
}
 
export default ProfileContainer;
