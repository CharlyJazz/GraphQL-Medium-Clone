import React from 'react'
import 'medium-draft/lib/index.css'
import {
  Editor,
  createEditorState,
} from 'medium-draft'

class MyEditor extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      editorState: createEditorState(), // for empty content
    }

    /*
    this.state = {
      editorState: createEditorState(data), // with content
    }
    */

    this.onChange = (editorState) => {
      this.setState({ editorState })
    }
  }

  render() {
    const { editorState } = this.state
    return (
      <Editor
        ref="editor"
        editorState={editorState}
        onChange={this.onChange} />
    )
  }
}

export default MyEditor