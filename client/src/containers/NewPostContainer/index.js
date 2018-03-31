import React, { Component } from 'react'
import MyEditor from '../../components/Editor'
import Grid from 'material-ui/Grid/Grid'
import { withStyles } from 'material-ui/styles'
import PaperCenter from '../../components/UI/PaperCenter/PaperCenter'
import Divider from 'material-ui/Divider'
import Button from 'material-ui/Button'
import { createEditorState } from 'medium-draft'
import mediumDraftExporter from 'medium-draft/lib/exporter'

const styles = theme => ({
  gridButton: {
    marginTop: '1rem',
    textAlign: 'right'
  }
})

class NewPostContainer extends Component {
  state = {
    editorState: createEditorState()
  }

  onChange = (editorState) => {
    this.setState({ editorState })
  }

  onSubmitPost = () => {
    console.log(mediumDraftExporter(this.state.editorState.getCurrentContent()))
  }

  render() {
    let { classes } = this.props

    return (
      <PaperCenter>
        <MyEditor
          editorState={this.state.editorState}
          onChange={this.onChange}
        />
        <Divider />
        <Grid item xs={12} className={classes.gridButton}>
          <Button raised color="primary" onClick={this.onSubmitPost}>
            Create
          </Button>        
        </Grid>
      </PaperCenter>
    );
  }
}

export default withStyles(styles)(NewPostContainer)