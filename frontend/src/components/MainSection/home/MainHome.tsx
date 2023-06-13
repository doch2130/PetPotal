import { useEffect, useState } from 'react';
import DogImage from '../../../assets/mainpage/MainPage_Dog.png';
import CatImage from '../../../assets/mainpage/MainPage_Cat.png';
import style from './MainHome.module.css';

export default function MainHome() {
  const [imgChange, setImgChange] = useState(true);

  useEffect(() => {
    const imageChangeTimer = setTimeout(() => {
      setImgChange(!imgChange);
    }, 6000);

    return () => {
      clearTimeout(imageChangeTimer);
    }

  }, [imgChange]);

  return (
    <div className={style.wrap}>
      <div className={style.wrapCol}>
        <div className={style.wrapImg}>
          <img src={imgChange ? DogImage : CatImage} className={`${style.animatedImage} ${imgChange ? style.dogImg : style.catImg}`} alt='mainAnimalImage'/>
          {/* {imgChange ? 
          <img src={DogImage} alt='test' className={style.dogImg} /> :
          <img src={CatImage} alt='test' className={style.catImg} />} */}
          <div className={style.imgSource}>
            <a href="https://kr.freepik.com/free-vector/happy-pomeranian-dog-character-hand-drawn-cartoon-art-illustration_17303376.htm#page=2&query=Canis lupus familiaris&position=30&from_view=search&track=ais">작가 mamewmy</a>
            <a href="https://kr.freepik.com/free-vector/hand-drawn-kawaii-objects-collection_26230952.htm#from_view=detail_serie">Freepik</a>
          </div>
        </div>
      </div>
      <div className={style.wrapCol}>
        <div className={style.wrapText}>
          <h1>당신 근처의 Pet Potal</h1>
          <p>동네의 반려동물 서비스를 한 눈에 <br />원하는 서비스를 받아보세요!</p>
        </div>
      </div>
    </div>
  )
}
