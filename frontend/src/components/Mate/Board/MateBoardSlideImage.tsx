import { useEffect, useRef, useState } from 'react'
import mateSlideImage1 from '../../../assets/matepage/mateSlideImage_1.png';
import mateSlideImage2 from '../../../assets/matepage/mateSlideImage_2.png';
import mateSlideImage3 from '../../../assets/matepage/mateSlideImage_3.png';
import leftButton from '../../../assets/icon/leftButton.png';
import rightButton from '../../../assets/icon/rightButton.png';
import style from './MateBoardSlideImage.module.css';

const imageData = [mateSlideImage2, mateSlideImage3, mateSlideImage1];

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

  const startTimer = ():void => {
    timerRef.current = window.setTimeout(() => {
      nextSlide();
    }, 5000);
    return ;
  };

  const resetTimer = ():void => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    startTimer();
    return ;
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
    return ;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentImgIndex]);

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentImgIndex]);

  return (
    <div className={style.wrap}>
      <div className={style.imageWrap}>
        {imageDataList.map((el, index) => {
          return (
            <img src={el} alt='mateSlideImage' key={index} style={slideStyle} />
          )
        })}
      </div>
      <div className={style.buttonWrap}>
        <div className={style.buttonGroup}>
         <img src={leftButton} alt='PrevButton' onClick={prevSlide} />
        <img src={rightButton} alt='NextButton' onClick={nextSlide} />
        </div>
      </div>
    </div>
  )
}
