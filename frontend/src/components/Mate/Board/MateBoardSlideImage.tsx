import React, { useEffect, useRef, useState } from 'react'
import style from './MateBoardSlideImage.module.css';
import mateSlideImage1 from '../../../assets/matepage/mateSlideImage_1.png';
import mateSlideImage2 from '../../../assets/matepage/mateSlideImage_2.png';
import mateSlideImage3 from '../../../assets/matepage/mateSlideImage_3.png';
import topButton from '../../../assets/icon/topButton.png';

const imageData = [mateSlideImage1, mateSlideImage2, mateSlideImage3];

interface slideStyleInterface {
  transform: string;
  transition: string;
}

export default function MateBoardSlideImage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [imageDataList, setImageDataList] = useState<string[]>([
    imageData[imageData.length - 1],
    ...imageData,
    imageData[0]
  ]);
  const [currentImgIndex, setCurrentImgIndex] = useState<number>(0);
  const [slideStyle, setSlideStyle] = useState<slideStyleInterface>({
    transform: `translateX(-${currentImgIndex}00%)`,
    transition: `all 0.4s ease-in-out`,
  });

  const timerRef = useRef<number | null>(null);
  const startTimer = ():void => {
    timerRef.current = window.setTimeout(() => {
      nextSlide();
    }, 5000);
  };

  const resetTimer = ():void => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    startTimer();
  };

  useEffect(() => {
    startTimer();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(():void => {
    resetTimer();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentImgIndex]);

  const nextSlide = ():void => {
    setCurrentImgIndex(currentImgIndex + 1);
    setSlideStyle({
      transform: `translateX(-${currentImgIndex + 1}00%)`,
      transition: `all 0.4s ease-in-out`,
    });
    return ;
  };

  const prevSlide = ():void => {
    setCurrentImgIndex(currentImgIndex - 1);
    setSlideStyle({
      transform: `translateX(-${currentImgIndex - 1}00%)`,
      transition: `all 0.4s ease-in-out`,
    });
    return ;
  }

  useEffect(():void => {
    if (currentImgIndex === 0) {
      setCurrentImgIndex(imageDataList.length - 2);
      setTimeout(function () {
        setSlideStyle({
          transform: `translateX(-${imageDataList.length - 2}00%)`,
          transition: '0ms',
        });
      }, 500);
      return ;
    }

    if (currentImgIndex >= imageDataList?.length - 1) {
      setCurrentImgIndex(1);
      setTimeout(() => {
        setSlideStyle({
          transform: `translateX(-${1}00%)`,
          transition: '0ms',
        });
      }, 500);
      return ;
    }
  }, [currentImgIndex, imageDataList.length]);
  
  return (
    <div className={style.wrap}>
      <div className={style.imageWrap}>
        {imageDataList.map((el, index) => {
          return (
            <img src={el} alt='mateSlideImage' key={index} style={slideStyle} />
          )
        })}
      </div>
      <div className={style.buttonGroup}>
        <img src={topButton} alt='PrevButton' onClick={prevSlide} />
        <img src={topButton} alt='NextButton' onClick={nextSlide} />
      </div>
    </div>
  )
}
