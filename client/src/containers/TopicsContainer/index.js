import React, { Component } from 'react';
import Grid from 'material-ui/Grid/Grid';
import MenuTopics from '../../components/Navegation/MenuTopics/MenuTopics';
import Typography from 'material-ui/Typography/Typography';


class TopicsContainer extends Component {
  render() {
    let name = this.props.match.params.name || false;

    return (
      <React.Fragment>
        { name
          ? (
            <Grid item xs={12}>
              <Typography variant="display4" gutterBottom paragraph={true}>
                {name.replace(/\b\w/g, l => l.toUpperCase())}
              </Typography>
            </Grid>
            )
          : (
            <Grid item xs={12}>
              <MenuTopics/>
            </Grid>
            )
        }
      </React.Fragment>
    )
  }
}

export default TopicsContainer;