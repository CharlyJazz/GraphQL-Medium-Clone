import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Grid from 'material-ui/Grid/Grid';
import Header from '../../components/Navegation/Header/Header';

class Layout extends Component {
  render() {
    return (
      <React.Fragment>
        <Header/>
        <main style={{ paddingLeft: 20, paddingRight: 20 }}> 
          <Grid container spacing={0}>
            {this.props.children}
          </Grid>
        </main>
      </React.Fragment>
    )
  }
}

export default withRouter(Layout);