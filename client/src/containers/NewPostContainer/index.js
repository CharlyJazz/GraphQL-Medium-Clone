import React, { Component } from 'react'
import MyEditor from '../../components/Editor'
import Grid from 'material-ui/Grid/Grid'
import { withStyles } from 'material-ui/styles'
import PaperCenter from '../../components/UI/PaperCenter/PaperCenter'

const styles = theme => ({
  
})

class NewPostContainer extends Component {
  render() {
    return (
      <PaperCenter>
        <MyEditor/>
      </PaperCenter>
    );
  }
}

export default withStyles(styles)(NewPostContainer)