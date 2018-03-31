import React from 'react'
import 'medium-draft/lib/index.css'
import { Editor } from 'medium-draft'
import ImageButton from './Sides/ImageButton'

class MyEditor extends React.Component {
  constructor(props) {
    super(props)

    this.sideButtons = [{
      title: 'Add a Image',
      component: ImageButton,
    }];
  }

  render() {
    const editorState = this.props.editorState
    return (
      <Editor
        ref="editor"
        editorState={editorState}
        onChange={this.props.onChange}
        sideButtons={this.sideButtons} />
    )
  }
}

export default MyEditor