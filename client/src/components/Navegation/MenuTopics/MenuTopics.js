import React, { Component } from 'react';
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
    width: '100%',
    marginTop: theme.spacing.unit * 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class MenuTopics extends Component {
  state = {
    value: 0, // TODO: Quitar esto e implementar React Router
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default" className="DontUseShadow">
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            scrollable
            scrollButtons="auto"
          >
            <Tab label="Item 1" />
            <Tab label="Item 2" />
            <Tab label="Item 3" />
            <Tab label="Item 4" />
            <Tab label="Item 5" />
            <Tab label="Item 6" />
            <Tab label="Item 7" />
            <Tab label="Item 8" />
            <Tab label="Item 9" />
            <Tab label="Item 10" />
            <Tab label="Item 11" />
            <Tab label="Item 12" />
          </Tabs>
        </AppBar>
      </div>
    );
  }
}

MenuTopics.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuTopics);