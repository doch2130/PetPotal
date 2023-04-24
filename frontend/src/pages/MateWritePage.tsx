// import React from 'react'
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import MateWriteForm from '../components/Mate/Write/MateWriteForm';
import FileUploadButton from '../components/UI/FileUploadButton';
import PictureBox from '../components/UI/PictureBox';
import style from './MateWritePage.module.css';

export default function MateWritePage() {
  const [imgFile, setImgFile] = useState<File[]>([]);
  const [imgUrl, setImgUrl] = useState<string[]>([]);

  const imgFileHandler = (e:ChangeEvent<HTMLInputElement>):void => {
    const files:any = e.target.files;

    if(files === null || files.length === 0) {
      return ;
    }

    if(imgFile.length > 0) {
      setImgFile([]);
      imgUrl.forEach((el) => {
        URL.revokeObjectURL(el);
      });
      setImgUrl([]);
    }

    if(files.length > 5) {
      alert('사진은 5개 이하만 등록 가능합니다.');
      return ;
    }

    const tempUrlList = [];

    const obj:any = [];
    for (const key in files) {
      if(key === 'length' || key === 'item') continue;

      const currentImgUrl = URL.createObjectURL(files[key]);
      files[key].url = currentImgUrl;
      obj.push(files[key]);
      tempUrlList.push(currentImgUrl);
    }

    setImgUrl(tempUrlList as string[]);
    setImgFile(obj.sort().reverse() as File[]);
    // console.log('obj : ', obj);
  }



  const [mouseDownClientX, setMouseDownClientX] = useState(0);
  const [mouseDownClientY, setMouseDownClientY] = useState(0);
  const [mouseUpClientX, setMouseUpClientX] = useState(0);
  const [mouseUpClientY, setMouseUpClientY] = useState(0);

  const onMouseDown = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    console.log('onMouseDown');
    setMouseDownClientX(e.clientX);
    setMouseDownClientY(e.clientY);
  };
  const onMouseUp = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    console.log('onMouseUp');
    setMouseUpClientX(e.clientX);
    setMouseUpClientY(e.clientY);
  };
  
  useEffect(() => {
    const dragSpaceX = Math.abs(mouseDownClientX - mouseUpClientX);
    const dragSpaceY = Math.abs(mouseDownClientY - mouseUpClientY);
    const vector = dragSpaceX / dragSpaceY;

    if (mouseDownClientX !== 0 && dragSpaceX > 100 && vector > 2) {
      if (mouseUpClientX < mouseDownClientX) {
        handleNextBtn();
      } else if (mouseUpClientX > mouseDownClientX) {
        handlePrevBtn();
      }
    }
  }, [mouseUpClientX]);

  const slideRef = useRef<any>([]);
  const [currentIdx, setCurrentIdx] = useState(0);

  const handleNextBtn = ():void => {
    // console.log('slideRef ', slideRef);
    if(currentIdx === imgFile.length-1) {
      setCurrentIdx(0);
      // console.log('max length');
      slideRef.current.forEach((el:any) => {
        el.style.transition = "all 0.5s ease-in-out";
        el.style.transform = `translateX(0px)`;
      });
    } else {
      setCurrentIdx((prev) => prev + 1);
      slideRef.current.forEach((el:any) => {
        el.style.transition = "all 0.5s ease-in-out";
        el.style.transform = `translateX(-${300 * (currentIdx + 1)}px)`;
      });
    }
  }

  const handlePrevBtn = ():void => {
    // console.log('slideRef ', slideRef);
    if(currentIdx === 0) {
      setCurrentIdx(imgFile.length-1);
      // console.log('max length');
      slideRef.current.forEach((el:any) => {
        el.style.transition = "all 0.5s ease-in-out";
        el.style.transform = `translateX(-${300 * (imgFile.length-1)}px)`;
      });
    } else {
      setCurrentIdx((prev) => prev - 1);
      slideRef.current.forEach((el:any) => {
        el.style.transition = "all 0.5s ease-in-out";
        el.style.transform = `translateX(-${300 * (currentIdx-1)}px)`;
      });
    }
  }


  


  return (
    <div className={style.wrap}>
      <div className={style.wrapBody}>
        <h1>메이트 글쓰기</h1>
        <div className={style.wrapPreview} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
          <PictureBox width='300px' height='300px'>
              {imgFile.map((el:any, index:number) => {
                return (
                <div key={index} ref={(el) => slideRef.current[index] = el}>
                  <img src={el.url} alt={el.name} />
                </div>
                );
              })}
            <div className={style.pictureCount}>
              <span>{currentIdx+1}</span>
              <span>/</span>
              <span>{imgFile.length}</span>
            </div>
        </PictureBox>
        </div>
        <FileUploadButton onLoadFileHandler={imgFileHandler} />
        <MateWriteForm />
      </div>
    </div>
  )
}


