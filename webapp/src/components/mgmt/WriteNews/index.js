import React from 'react'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './style.scss'

export default function Index({ content, onChange }) {
   
    return (
        <Editor wrapperClassName="editor-wrap" editorClassName='editor' editorState={content} onEditorStateChange={(e) => { onChange(e) }} />
    )
}
