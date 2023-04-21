// import React from 'react'
import MateWriteForm from '../components/Mate/Write/MateWriteForm';
import FileUploadButton from '../components/UI/FileUploadButton';
import PictureBox from '../components/UI/PictureBox';
import style from './MateWritePage.module.css';

export default function MateWritePage() {
  return (
    <div className={style.wrap}>
      <div className={style.wrapBody}>
        <h1>메이트 글쓰기</h1>
        <PictureBox width='300px' height='300px'>
          <div className={style.pictureCount}>
            <span>1</span>
            <span>/</span>
            <span>5</span>
          </div>
        </PictureBox>
        <FileUploadButton />
        <MateWriteForm />
      </div>
    </div>
  )
}
