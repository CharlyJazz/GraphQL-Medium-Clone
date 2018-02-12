import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 3
  },
  bar: {
    backgroundColor: 'transparent !important'
  }
});

class ProfileTabs extends React.Component {
  state = {
    value: 'posts',
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="primary" className={[classes.bar, "DontUseShadow"].join(' ')}>
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="secondary"
            textColor="secondary"
            centered>
            <Tab value="posts" label="Posts" />
            <Tab value="claps" label="Claps" />
            <Tab value="collections" label="Collections" />
            <Tab value="comments" label="Comments" />
          </Tabs>
        </AppBar>
        {value === 'posts'       && <TabContainer>Posts</TabContainer>}
        {value === 'claps'       && <TabContainer>Claps</TabContainer>}
        {value === 'collections' && <TabContainer>Collections</TabContainer>}
        {value === 'comments'    && <TabContainer>Comments</TabContainer>}
      </div>
    );
  }
}

ProfileTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileTabs);