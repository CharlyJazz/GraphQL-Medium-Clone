import React, { Component } from 'react';
import Grid from 'material-ui/Grid/Grid';
import MenuTopics from '../../components/Navegation/MenuTopics/MenuTopics';
import Typography from 'material-ui/Typography/Typography';
import { graphql } from 'react-apollo';
import { withStyles } from 'material-ui/styles';
import PostsContainer from './components/postsContainer';
import PostLoading from './components/postsLoading';
import query from './query';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  paper: {
    padding: 16,
    color: theme.palette.text.secondary,
  }
});

class TopicsContainer extends Component {
  render() {

    let name = this.props.match.params.name || false;
    let divTitle = null;
    let topicFiltered = null;

    const { classes } = this.props;


    if (!this.props.data.loading) {
      topicFiltered = this.props.data.allTopics.find((n) => {
        return n['name'] === name
      })
    }

    if (name) {
      divTitle = (
        <Grid item xs={12}>
          <Typography type="display3" gutterBottom paragraph={true}>
            {name.replace(/\b\w/g, l => l.toUpperCase())}
          </Typography>
          {this.props.data.loading === false &&
          <Typography type="display1" gutterBottom paragraph={true}>
            {topicFiltered.description}
          </Typography>
          }
        </Grid>
      )
    }
    else {
      divTitle = (
        <Grid item xs={12}>
          <MenuTopics/>
        </Grid>
      )
    }

    return (
      <React.Fragment>
        { divTitle }
        <div className={classes.root}>
          {this.props.data.loading
            ? <PostLoading/>
            : name 
              ? <PostsContainer
                  classes={this.props.classes}
                  posts={topicFiltered.posts}/>
              : (
                this.props.data.allTopics.map( topic => {
                  return (
                    <PostsContainer 
                      key={topic.id}
                      classes={this.props.classes}
                      posts={topic.posts}
                      topicName={topic.name}/>
                  )
                })
              )
            }
        </div>
      </React.Fragment>
    )
  }
}


export default graphql(query)(
  withStyles(styles)(TopicsContainer)
);