import { useEffect, useState } from 'react';
import MateWriteForm from './MateWriteForm';
import MateWritePreview from './MateWritePreview';
import style from './MateWrite.module.css';

export default function MateWrite() {
  // 미리보기 이미지 파일
  const [imgFile, setImgFile] = useState<File[]>([]);

  // 없으면 게시판=>글작성으로 넘어갈 때 상단으로 안움직임
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={style.wrap}>
      <div className={style.wrapBody}>
        <h1>메이트 글 작성</h1>
        <MateWritePreview imgFile={imgFile} setImgFile={setImgFile} />
        <p className={style.previewText}>사진은 5개까지 등록이 가능합니다.</p>
        <p className={style.previewText}>1번 사진이 글의 대표사진으로 등록됩니다.</p>
        <MateWriteForm imgFile={imgFile} />
      </div>
    </div>
  )
}


