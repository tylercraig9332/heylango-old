import React from 'react';
import { EditorState, RichUtils } from 'draft-js';
import { Icon } from 'antd'
import 'tippy.js/dist/tippy.css';
import Tippy from '@tippyjs/react'
import './buttonStyle.css'
import './toolbar.css'

function Blocks(props : {getEditorState : any, setEditorState : any}) {

    function _toggleBlockType(event : any) {
  
      const eState = RichUtils.toggleBlockType(
        props.getEditorState(),
          event.currentTarget.id
        )
      props.setEditorState(eState)
    }
  
      return (
        <span>
          <Tippy content={<div>Heading 1</div>} arrow={true}>
            <button id="header-one" className="toolbar" onClick={_toggleBlockType}>H1</button>
          </Tippy>
          <Tippy content={<div>Heading 2</div>} arrow={true}>
            <button id="header-two" className="toolbar" onClick={_toggleBlockType}>H2</button>
          </Tippy>
          <Tippy content={<div>Heading 3</div>} arrow={true}>
            <button id="header-three"className="toolbar" onClick={_toggleBlockType}>H3</button>
          </Tippy>
          <Tippy content={<div>Bullet List</div>} arrow={true}>
            <button id="unordered-list-item" className="toolbar" onClick={_toggleBlockType}><Icon type="unordered-list" /></button>
          </Tippy>
          <Tippy content={<div>Number List</div>} arrow={true}>
            <button id="ordered-list-item" className="toolbar" onClick={_toggleBlockType}><Icon type="ordered-list" /></button>
          </Tippy>
        </span>
      )
  }

function BoldItalic(props : {getEditorState : any, setEditorState : any}) {

    function _toggleInlineStyle(event : any) {
      const eState = props.getEditorState()
      props.setEditorState(RichUtils.toggleInlineStyle(eState, event.currentTarget.id))
    }
  
    return (
      <span>
          <Tippy content={<div>Bold</div>} arrow={true}>
            <button id="BOLD" className="toolbar" onClick={_toggleInlineStyle}><Icon type="bold" /></button>
          </Tippy>
          <Tippy content={<div>Italic</div>} arrow={true}>
            <button id="ITALIC" className="toolbar" onClick={_toggleInlineStyle}><Icon type="italic" /></button>
          </Tippy>
        </span>
    )
}


function Seperator() {
    return(<span className="separator"></span>)
}

function Toolbar(props : {getEditorState : any, setEditorState : any}) {
    return (
        <div className="tool">
            <BoldItalic setEditorState={(eState : EditorState) => props.setEditorState(eState)} getEditorState={props.getEditorState} />
            <Seperator />
            <Blocks setEditorState={(eState : EditorState) => props.setEditorState(eState)} getEditorState={props.getEditorState}/>
        </div>
    )
}


export default Toolbar