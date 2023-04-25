import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import ImageResize from 'quill-image-resize';
// Quill.register('modules/ImageResize', ImageResize);
// import { ImageResize } from 'quill-image-resize-module-ts';
// import { ImageDrop } from 'quill-image-drop-module-ts';
import ImageResize from '@looop/quill-image-resize-module-react';
Quill.register('modules/ImageResize', ImageResize);

// typescript에서 모듈 관련하여 img 삽입 시 resize 기능에 문제가 발생
// resize를 해도 toolbar에서 문제가 발생하는 현상 확인

export default function MateWriteTextEditorQuil() {
  const onChangeContents = (e) => {
    console.log(e);
  };

  const modules = {
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
    },
    ImageResize: { modules: ['Resize'] },
  };

  return (
    <>
      <ReactQuill onChange={onChangeContents} modules={modules} />
    </>
  );
}
