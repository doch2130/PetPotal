import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import PictureBox from '../../UI/PictureBox';
import FileUploadButton from '../../UI/FileUploadButton';
import style from './MateWritePreview.module.css';

interface propsData {
  imgFile: Array<File>;
  setImgFile: Function;
}

export default function MateWritePreview(props:propsData) {
  const { imgFile, setImgFile } = props;
  const [mouseDownClientX, setMouseDownClientX] = useState(0);
  const [mouseDownClientY, setMouseDownClientY] = useState(0);
  const [mouseUpClientX, setMouseUpClientX] = useState(0);
  const [mouseUpClientY, setMouseUpClientY] = useState(0);

  // const [imgFile, setImgFile] = useState<File[]>([]);
  const [imgUrl, setImgUrl] = useState<string[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const slideRef = useRef<any>([]);

  const onMouseDown = useCallback((e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setMouseDownClientX(e.clientX);
    setMouseDownClientY(e.clientY);
  }, []);

  const onMouseUp = useCallback((e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setMouseUpClientX(e.clientX);
    setMouseUpClientY(e.clientY);
  }, []);

  const handleNextBtn = ():void => {
    // if(imgFile.length === 1) {
    if(imgUrl.length === 1) {
      return ;
    }

    // if(currentIdx === imgFile.length-1) {
    if(currentIdx === imgUrl.length-1) {
      setCurrentIdx(0);
      slideRef.current.forEach((el:any) => {
        if(el !== null) {
          el.style.transition = "all 0.5s ease-in-out";
          el.style.transform = `translateX(0px)`;
        }
        
      });
    } else {
      setCurrentIdx((prev:number) => prev + 1);
      slideRef.current.forEach((el:any) => {
        if(el !== null) {
          el.style.transition = "all 0.5s ease-in-out";
          el.style.transform = `translateX(-${300 * (currentIdx + 1)}px)`;
        }

      });
    }
  };

  const handlePrevBtn = ():void => {
    // if(imgFile.length === 1) {
    if(imgUrl.length === 1) {
      return ;
    }

    if(currentIdx === 0) {
      // setCurrentIdx(imgFile.length-1);
      setCurrentIdx(imgUrl.length-1);
      slideRef.current.forEach((el:any) => {
        if(el !== null) {
          el.style.transition = "all 0.5s ease-in-out";
          el.style.transform = `translateX(-${300 * (imgFile.length-1)}px)`;
        }
      });
    } else {
      setCurrentIdx((prev:number) => prev - 1);
      slideRef.current.forEach((el:any) => {
        if(el !== null) {
          el.style.transition = "all 0.5s ease-in-out";
          el.style.transform = `translateX(-${300 * (currentIdx-1)}px)`;
        }
      });
    }
  };

  const imgFileHandler = (e:ChangeEvent<HTMLInputElement>):void => {
    const files:any = e.target.files;

    if(files === null || files.length === 0) {
      return ;
    }

    if(files.length > 5) {
      alert('사진은 5개 이하만 등록 가능합니다.');
      return ;
    }

    // if(imgFile.length > 0) {
    if(imgUrl.length > 0) {
      setImgFile([]);
      imgUrl.forEach((el) => {
        URL.revokeObjectURL(el);
      });
      setImgUrl([]);
      setCurrentIdx(0);

      slideRef.current.forEach((el:any) => {
        if(el !== null) {
          el.style.transition = 'none';
          el.style.transform = 'none';
        }
      });
    }

    const tempUrlList = [];
    const obj:any = [];

    for (const key in files) {
      if(key === 'length' || key === 'item') continue;

      const currentImgUrl = URL.createObjectURL(files[key]);
      // files[key].url = currentImgUrl;
      obj.push(files[key]);
      tempUrlList.push(currentImgUrl);
    }

    setImgUrl(tempUrlList.sort().reverse() as string[]);
    setImgFile(obj.sort().reverse() as File[]);
    // setImgFile(files.sort().reverse() as File[]);

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mouseUpClientX]);

  useEffect(() => {

    return () => {
      // console.log('unmount');
      imgUrl.forEach((el) => {
        URL.revokeObjectURL(el);
      });
    }
  }, [imgUrl]);

  return (
    <>
      <div className={style.wrapPreview} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
        <PictureBox width='300px' height='300px'>
          {imgUrl.map((el:any, index:number) => {
            return (
            <div key={index} ref={(el) => slideRef.current[index] = el}>
              <img src={el} alt={el} />
            </div>
            );
          })}
          {imgUrl.length > 0 &&
          <div className={style.pictureCount}>
            <span>{currentIdx+1}</span>
            <span>/</span>
            <span>{imgUrl.length}</span>
          </div>
          }
        </PictureBox>
      </div>
      <FileUploadButton onLoadFileHandler={imgFileHandler} multiple={true} />
    </>
  )
}
