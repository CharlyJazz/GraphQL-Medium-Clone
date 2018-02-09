import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Tabs, { Tab } from 'material-ui/Tabs';
import AppBar from 'material-ui/AppBar';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


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

  handleClickHome = () => {
    /*
    * Redirect to /
    * */
    this.timeOut && clearTimeout(this.timeOut); // Prevent multiple redirect

    this.props.history.push('/')
  }

  handleClickTopic = (IdTopic) =>{
    /*
    * Redirect to /topic/:topicName
    * */
    this.timeOut && clearTimeout(this.timeOut); // Prevent multiple redirect

    this.timeOut = setTimeout(() => {
      this.props.history.push(`/topics/${this.props.data.allTopics.find((n) => {
        return n['id'] === IdTopic
      })['name']}`)
    }, 600)
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        {this.props.data.loading
          ? 'Loading'
          : (
            <AppBar position="static" color="default" className="DontUseShadow">
              <Tabs
                value={value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                scrollable
                scrollButtons="auto">

                <Tab label="Home" onClick={this.handleClickHome}/>

                { this.props.data.allTopics.map( topic => (
                  <Tab key={topic.id} label={topic.name} onClick={this.handleClickTopic.bind(null, topic.id)}/>
                ))}

              </Tabs>
            </AppBar>
          )
        }
        
      </div>
    );
  }
}

MenuTopics.propTypes = {
  classes: PropTypes.object.isRequired,
};

// Search the Topics
const query = gql`
  query {
    allTopics {
      id
      name
    }
  }
`

export default graphql(query)(
  withRouter(
    withStyles(styles)(MenuTopics)
  )
);