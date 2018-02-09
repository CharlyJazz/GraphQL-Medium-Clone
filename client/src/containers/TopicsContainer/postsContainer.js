import React from 'react';
import PropTypes from 'prop-types';
import PostPreviewPaper from '../../components/PostPreviewPaper/PostPreviewPaper';
import Grid from 'material-ui/Grid/Grid';
import Typography from 'material-ui/Typography/Typography';

const postsContainer = props =>  {
  let posts = null;
  let title = null;

  if (props.topicName) {
    title = (
      <Grid item xs={12}>
        <Typography type="display3" gutterBottom paragraph={true}>
          {props.topicName.replace(/\b\w/g, l => l.toUpperCase())}
        </Typography>
      </Grid>
    )
  }

  if ( props.posts.length > 0 ) {
    posts = props.posts.map(post => {
      return (
        <Grid key={post.id} item xs={4}>
          <PostPreviewPaper 
            classesPaper={props.classes.paper}
            textFrom="bottom"
            textAlign="left"
            postedBy={post.postedBy.name}
            title={post.title}
            postId={post.id}
            avatarObject={{
              imgUrl: 'https://cdn-images-1.medium.com/max/427/1*AUdzgoLMR_28CgeX_YTzXA.png',
              imgAlt: `Picture of ${post.postedBy.name}`
            }}/>
        </Grid>
      )
    })
  }

  return (
    <Grid container>
      { title && title }        
      { posts}
    </Grid>
  )
}

postsContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired
};

export default postsContainer;