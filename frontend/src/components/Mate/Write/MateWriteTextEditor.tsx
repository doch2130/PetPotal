import { useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import style from './MateWriteTextEditor.module.css';


// 일단 안쓰는것으로 결정, npm 삭제했음


export default function MateWriteTextEditor(props:any) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  
  const onEditorStateChangeHandler = (editorState:EditorState) => {
    // editorState에 값 설정
    setEditorState(editorState);

    const data = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
    console.log('data : ', data);
    
  };

  console.log('editorState : ', editorState);

  const uploadCallback = (file: Blob) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = async () => {
            const formData = new FormData();
            formData.append("multipartFiles", file);
            // const res = await axios.post('http://localhost:8080/uploadImage', formData);

            // resolve({ data: { link: res.data } });
            resolve(true);
        };

        reader.readAsDataURL(file);
    });
};

  const toolbar = {
    list: { inDropdown: true }, // list 드롭다운
    textAlign: { inDropdown: true }, // align 드롭다운
    link: { inDropdown: true }, // link 드롭다운
    history: { inDropdown: false }, // history 드롭다운
    image: { uploadCallback: uploadCallback }, // 이미지 커스텀 업로드
}

  return (
    <Editor
    toolbar={toolbar} 
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
