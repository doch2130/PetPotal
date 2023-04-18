// import React from 'react'
import style from './MainHoteling.module.css';
import HotelingImg1 from '../../../assets/mainpage/Hoteling/MainPage_Hoteling_Img_1.jpg';
import HotelingImg2 from '../../../assets/mainpage/Hoteling/MainPage_Hoteling_Img_2.jpg';
import HotelingImg3 from '../../../assets/mainpage/Hoteling/MainPage_Hoteling_Img_3.jpg';

export default function MainHoteling() {
  return (
    <div className={style.wrap}>
      <div className={style.wrapCol}>
        <h1>Hoteling</h1>
        <p>A place where you can trust and entrust your pet at any time
          <br />Find a dog hotel with the best service</p>
      </div>
      <div className={style.wrapCol}>
        <div className={style.wrapImg}>
          <img src={HotelingImg1} alt='Hoteling Img1' />
        </div>
        <div className={style.wrapImg}>
          <img src={HotelingImg2} alt='Hoteling Img2' />
        </div>
        <div className={style.wrapImg}>
          <img src={HotelingImg3} alt='Hoteling Img3' />
        </div>
      </div>
    </div>
  )
}
