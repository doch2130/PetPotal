// eslint-disable-next-line no-unused-vars
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from '@looop/quill-image-resize-module-react';
import Controller from '../../../api/controller';
import { useAlert } from '../../../hooks/useAlert';
Quill.register('modules/ImageResize', ImageResize);

// typescript에서 모듈 관련하여 img 삽입 시 resize 기능에 문제가 발생
// typescript resize를 해도 toolbar에서 문제가 발생하는 현상 확인되어 일단, js 파일로 진행

export default function MateWriteTextEditorQuil({ placeholderText, name, setValueHandler, initialValue }) {
  // eslint-disable-next-line no-unused-vars
  const [imgTempList, setImgTempList] = useState([]);
  const quillRef = useRef();
  const controller = new Controller();
  const { openAlert } = useAlert();

  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.addEventListener('change', async () => {
      const imgFile = input.files[0];
      const formData = new FormData();
      formData.append('imgFile', imgFile);

      try {
        const result = await controller.mateWriteTextEditorImage(formData);
        // console.log(result.data);
        const imgUrl = result.data.imgUrl;
        const editor = quillRef.current.getEditor();
        const range = editor.getSelection();
        editor.insertEmbed(range.index, 'image', imgUrl);

        // console.log('fileName : ', result.data.fileName);
        setImgTempList((prev) => [...prev, result.data.fileName]);
        // setImgTemp(result.data.fileName);
      } catch (error) {
        openAlert({
          title: '텍스트에디터 이미지 에러',
          type: 'error',
          content: '에러가 발생하였습니다.\r\n새로고침 후 다시 시도해주세요!',
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeContents = (e) => {
    // console.log(e);
    setValueHandler(name, e);
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ font: [] }, { header: [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [
            {
              color: [
                '#000000',
                '#e60000',
                '#ff9900',
                '#ffff00',
                '#008a00',
                '#0066cc',
                '#9933ff',
                '#ffffff',
                '#facccc',
                '#ffebcc',
                '#ffffcc',
                '#cce8cc',
                '#cce0f5',
                '#ebd6ff',
                '#bbbbbb',
                '#f06666',
                '#ffc266',
                '#ffff66',
                '#66b966',
                '#66a3e0',
                '#c285ff',
                '#888888',
                '#a10000',
                '#b26b00',
                '#b2b200',
                '#006100',
                '#0047b2',
                '#6b24b2',
                '#444444',
                '#5c0000',
                '#663d00',
                '#666600',
                '#003700',
                '#002966',
                '#3d1466',
                'custom-color',
              ],
            },
            { background: [] },
          ],
          [{ list: 'ordered' }, { list: 'bullet' }, { align: [] }],
          ['link', 'image'],
        ],
        handlers: { image: imageHandler },
      },
      ImageResize: { modules: ['Resize'] },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ReactQuill
        onChange={onChangeContents}
        modules={modules}
        style={{ height: '200px' }}
        placeholder={placeholderText || ''}
        ref={quillRef}
        value={initialValue}
      />
    </>
  );
}
