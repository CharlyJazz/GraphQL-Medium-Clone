import React, { Component } from 'react';
import MenuTopics from '../../components/Navegation/MenuTopics/MenuTopics';
import Grid from 'material-ui/Grid/Grid';


class HomeContainer extends Component {
  state = {}
  render() { 
    return (
      <Grid item xs={12} sm={12}>
        <MenuTopics/>       
        <h1>HomeContainer</h1>
      </Grid>
     )
  }
}
 
export default HomeContainer;