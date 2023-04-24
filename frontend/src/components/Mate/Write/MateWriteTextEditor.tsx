import { useState } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import style from './MateWriteTextEditor.module.css';




export default function MateWriteTextEditor(props:any) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  
  const onEditorStateChangeHandler = (editorState:EditorState) => {
    // editorState에 값 설정
    setEditorState(editorState);
  };

  return (
    <Editor
      // 에디터와 툴바 모두에 적용되는 클래스
      wrapperClassName={style.wrapEditor}
        // 툴바 주위에 적용된 클래스
      toolbarClassName={style.toolbar}
      // 에디터 주변에 적용된 클래스
      editorClassName={style.textEditor}
      // placeholder="내용을 작성해주세요."
      placeholder={props.sentences}
      // 한국어 설정
      localization={{ locale: 'ko', }}
      // 초기값 설정
      editorState={editorState}
      // 에디터의 값이 변경될 때마다 onEditorStateChange 호출
      onEditorStateChange={onEditorStateChangeHandler}
    />
  )
}
