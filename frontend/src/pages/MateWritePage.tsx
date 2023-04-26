import { useState } from 'react';
import MateWriteForm from '../components/Mate/Write/MateWriteForm';
import MateWritePreview from '../components/Mate/Write/MateWritePreview';
import style from './MateWritePage.module.css';

export default function MateWritePage() {
  const [imgFile, setImgFile] = useState<File[]>([]);

  return (
    <div className={style.wrap}>
      <div className={style.wrapBody}>
        <h1>메이트 글쓰기</h1>
        <MateWritePreview imgFile={imgFile} setImgFile={setImgFile} />
        <p className={style.previewText}>사진은 5개까지 등록이 가능합니다.</p>
        <p className={style.previewText}>1번 사진이 글의 대표사진으로 등록됩니다.</p>
        <MateWriteForm imgFile={imgFile} />
      </div>
    </div>
  )
}


