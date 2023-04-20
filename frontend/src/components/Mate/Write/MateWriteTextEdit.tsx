// import React from 'react'
import style from './MateWriteTextEdit.module.css';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorBlock, EditorState } from 'draft-js';
import { useMemo, useState } from 'react';

export default function MateWriteTextEdit() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState:any) => {
    // editorState에 값 설정
    setEditorState(editorState);
  };

  return (
    <div className={style.wrap}>
      <Editor
        // 초기값 설정
        editorState={editorState}
        // 에디터와 툴바 모두에 적용되는 클래스
        wrapperClassName={style.wrapEditor}
         // 툴바 주위에 적용된 클래스
        toolbarClassName={style.toolbar}
        // 에디터 주변에 적용된 클래스
        editorClassName={style.textEditor}
        // 에디터의 값이 변경될 때마다 onEditorStateChange 호출
        onEditorStateChange={onEditorStateChange}

        placeholder="내용을 작성해주세요."
        // 한국어 설정
        localization={{
          locale: 'ko',
        }}
      />
    </div>
  )
}
