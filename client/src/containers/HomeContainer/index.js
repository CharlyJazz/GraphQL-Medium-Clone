import React, { Component } from 'react'
import MenuTopics from '../../components/Navegation/MenuTopics/MenuTopics'
import Grid from 'material-ui/Grid/Grid'
import { withStyles } from 'material-ui/styles'
import PostPreviewPaper from '../../components/PostPreviewPaper/PostPreviewPaper'

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  paper: {
    padding: 16,
    color: theme.palette.text.secondary,
  }
})

class HomeContainer extends Component {
  state = {}
  render() {
    const { classes } = this.props
 
    return (
      <React.Fragment>
        <Grid item xs={12}>
          <MenuTopics/>
        </Grid>
        <Grid item xs={6}>
          <div className={classes.root}>    
            <Grid container spacing={24}  style={{"paddingRight": "24px"}}>
              <Grid item xs={12}>
                <PostPreviewPaper 
                  classesPaper={classes.paper}
                  textAlign="left"
                  postedBy='Carl Pepazo'
                  title={'The most cool title in tha world'}
                  postId={"1"}
                  avatarObject={{
                    imgUrl: 'https://cdn-images-1.medium.com/fit/c/60/60/1*e7o4kbk8ofT6eKaLrO0jaw.png',
                    imgAlt: 'Charl Namex',
                  }}/>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className={classes.root}>    
            <Grid container spacing={24}>
              <Grid item xs={6}>
                <PostPreviewPaper 
                  classesPaper={classes.paper}
                  textFrom="bottom"
                  textAlign="left"
                  title={'The most cool title in tha world'}
                  postId={"1"}
                  postedBy='Sam Beterson'/>
              </Grid>
              <Grid item xs={6}>
                <PostPreviewPaper
                  classesPaper={classes.paper}
                  textFrom="bottom"
                  textAlign="left"
                  title={'The most cool title in tha world'}
                  postId={"1"}
                  postedBy='Max'/>
              </Grid>
              <Grid item xs={6}>
                <PostPreviewPaper 
                  classesPaper={classes.paper}
                  textFrom="bottom"
                  textAlign="left"
                  title={'The most cool title in tha world'}
                  postId={"1"}
                  postedBy='Leorena'/>
              </Grid>
              <Grid item xs={6}>
                <PostPreviewPaper
                  classesPaper={classes.paper}
                  textFrom="bottom"
                  textAlign="left"
                  title={'The most cool title in tha world'}
                  postId={"1"}
                  postedBy='Richard'/>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </React.Fragment>
     )
  }
}
 
export default withStyles(styles)(HomeContainer)