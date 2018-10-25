import React, { Component } from 'react'
import PaperCenter from '../../components/UI/PaperCenter/PaperCenter'
import ProfileHeader from './components/profileHeader'
import ProfileCounts from './components/profileCounts'
import ProfileTabs from './components/profileTabs'
import Divider from 'material-ui/Divider/Divider'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { CircularProgress, withStyles, Slide, Zoom } from 'material-ui'
import query from './query'

const styles = theme => ({
  loadingDiv: {
    textAlign: 'center',
    width: '100%'
  },
  progress: {
    margin: theme.spacing.unit * 2
  },
});

class ProfileContainer extends Component {
  render() {
    let divContent = null
    let { classes } = this.props

    if (this.props.loading) {
      divContent = (
        <div className={classes.loadingDiv}>
          <CircularProgress className={classes.progress} color="secondary" thickness={7} />
        </div>
      )
    }
    
    else {
      divContent = (
        <Zoom in={true} style={{ transitionDelay: 500}}>
          <div>
            <ProfileHeader
              userName={this.props.user.username}
              userBio={this.props.user.bio}
              userLastname={this.props.user.last_name}
              userFirstname={this.props.user.first_name}
            />
            <ProfileCounts
              posts={this.props.user.count.posts}
              comments={this.props.user.count.comments}
              claps={this.props.user.count.claps}
              collections={this.props.user.count.collections}
              bookmarks={this.props.user.count.bookmarks}
            />
            <Divider/>
            <ProfileTabs/>
          </div>
        </Zoom>
      )
    }

    return ( 
      <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        <PaperCenter>
          {divContent}
        </PaperCenter>
      </Slide>
     )
  }
}

export default graphql(query, {
  options: (ownProps) => ({
    variables: {
      username: ownProps.match.params.name,
      quantity: 6
    }
  }),
  props: ({ownProps, data: { loading, searchUser, refetch } }) => ({
    loading: loading,
    user: searchUser,
    refetchUser: refetch,
  })
})(withRouter(withStyles(styles)(ProfileContainer)))