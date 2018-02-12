import React from 'react';
import Grid from 'material-ui/Grid/Grid';
import Paper from 'material-ui/Paper/Paper';
import { withStyles } from 'material-ui/styles';

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

const PaperCenter = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Grid item xs={12}>
        <Grid container justify="center">
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              { props.children }
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}
 
export default withStyles(styles)(PaperCenter);