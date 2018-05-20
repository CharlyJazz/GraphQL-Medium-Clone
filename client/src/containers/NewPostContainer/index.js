import React, { Component } from 'react'
import MyEditor from '../../components/Editor'
import Grid from 'material-ui/Grid/Grid'
import { withStyles } from 'material-ui/styles'
import PaperCenter from '../../components/UI/PaperCenter/PaperCenter'
import Divider from 'material-ui/Divider'
import Button from 'material-ui/Button'
import { createEditorState } from 'medium-draft'
import mediumDraftExporter from 'medium-draft/lib/exporter'
import { FormControl, FormHelperText } from 'material-ui/Form'
import Input, { InputLabel } from 'material-ui/Input'
import mutation from './mutation'
import { graphql } from 'react-apollo'

const styles = theme => ({
  gridButton: {
    marginTop: '1rem',
    textAlign: 'right'
  },
  FormControl: {
    marginLeft: '2rem'
  }
})

class NewPostContainer extends Component {
  state = {
    editorState: createEditorState(),
    title: 'Your new history',
    errors: {
      title: null,
      editor: null
    }
  }

  onChange = (editorState) => {
    this.setState({ editorState })
  }

  onSubmitPost = async () => {
    await this.props.createPost({
      variables: {
        body: mediumDraftExporter(this.state.editorState.getCurrentContent()),
        title: this.state.title,
        picture: 'Image.png',
        topicId: 2
      }
    })
  }

  render() {
    let { classes } = this.props
    const errors = this.state.errors

    return (
      <PaperCenter>
        <FormControl className={classes.FormControl}>
          <InputLabel htmlFor="title-input">Title of the history</InputLabel>
          <Input id="title-input" name="title" value={this.state.title} onChange={
            event => this.setState({ title: event.target.value })
          } type="text"/>
          {errors.title && 
            <FormHelperText id="title-input-text">{errors.title}</FormHelperText>
          }
        </FormControl>

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

export default graphql(mutation, {name: 'createPost'})(
  withStyles(styles)(NewPostContainer)
)