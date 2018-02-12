import React from 'react';
import Grid from 'material-ui/Grid/Grid';
import Typography from 'material-ui/Typography/Typography';
import PostPreviewLoader from '../../../components/UI/Loaders/PostPreviewLoader';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  gridItem: {
    padding: '8px'
  }
});

const PostLoading = props => {
  const { classes } = props;

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography type="display1">
          Loading
        </Typography>
      </Grid>
      <Grid item xs={4} className={classes.gridItem}>
        <PostPreviewLoader/>
      </Grid>
      <Grid item xs={4} className={classes.gridItem}>
        <PostPreviewLoader/>
      </Grid>
      <Grid item xs={4} className={classes.gridItem}>
        <PostPreviewLoader/>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(PostLoading);