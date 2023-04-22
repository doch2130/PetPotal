// import React from 'react'
import { useState } from 'react';
import MateWriteForm from '../components/Mate/Write/MateWriteForm';
import FileUploadButton from '../components/UI/FileUploadButton';
import PictureBox from '../components/UI/PictureBox';
import style from './MateWritePage.module.css';

export default function MateWritePage() {
  const [imgFile, setImgFile] = useState([]);
  // const imgRef = useRef();
  // console.log('imgFile : ', imgFile)
  // console.log('imgFile : ', typeof imgFile)
  // console.log('imgFile : ', imgFile[0]);

  return (
    <div className={style.wrap}>
      <div className={style.wrapBody}>
        <h1>메이트 글쓰기</h1>
        <PictureBox width='300px' height='300px'>
          <div className={style.picutreImg}>
            {imgFile.map((el, index) => {
              console.log('el : ', el);
              // console.log('el : ', el.File);
              return <>
                <img src={el} alt='' key={el} />
              </>;
            })}
          </div>
          <div className={style.pictureCount}>
            <span>1</span>
            <span>/</span>
            <span>{imgFile.length}</span>
          </div>
        </PictureBox>
        <FileUploadButton imgFileHandler={setImgFile} />
        <MateWriteForm />
      </div>
    </div>
  )
}
