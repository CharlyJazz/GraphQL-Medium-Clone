import React, { Component } from 'react'
import PaperCenter from '../../components/UI/PaperCenter/PaperCenter'
import ProfileHeader from './components/profileHeader'
import ProfileCounts from './components/profileCounts'
import ProfileTabs from './components/profileTabs'
import Divider from 'material-ui/Divider/Divider'
import { graphql } from 'react-apollo'
import query from './query'
import { withRouter } from 'react-router-dom'

class ProfileContainer extends Component {
  state = {}
  render() {
    let divContent = null

    if (this.props.loading) {
      divContent = <h1>Loading</h1>
    }
    
    else {
      divContent = (
        <React.Fragment>
          <ProfileHeader
            userName={this.props.user.username}
            userBio={this.props.user.bio}/>
          <ProfileCounts
            posts={this.props.user.count.posts}
            comments={this.props.user.count.comments}
            claps={this.props.user.count.claps}
            collections={this.props.user.count.collections}
            bookmarks={this.props.user.count.bookmarks}/>
          <Divider/>
          <ProfileTabs/>
        </React.Fragment>
      )
    }

    return ( 
      <PaperCenter>
        {divContent}
      </PaperCenter>
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
})(withRouter(ProfileContainer))