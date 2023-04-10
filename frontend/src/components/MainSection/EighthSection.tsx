// import React from 'react'
import style from './EighthSection.module.css';
import DogFoodImg from '../../assets/mainpage/Food/MainPage_Food_Img_1.png';
import LogoBrandImg1 from '../../assets/mainpage/Food/RoyalCanin.png';
import LogoBrandImg2 from '../../assets/mainpage/Food/ANF.png';
import LogoBrandImg3 from '../../assets/mainpage/Food/NaturalCore.png';
import LogoBrandImg4 from '../../assets/mainpage/Food/Nutrena.png';
import LogoBrandImg5 from '../../assets/mainpage/Food/LamuDali.png';
import LogoBrandImg6 from '../../assets/mainpage/Food/NaturalLab.png';

export default function EighthSection() {
  return (
    <div className={style.wrap}>
      <div className={style.box}>
        <div className={style.innerBox}>
          <div className={style.boxFlex}>
            <div className={style.boxLeft}>
              <div>
                <h1>The right food<br />For your<br />Pet</h1>
              </div>
            </div>
            <div className={style.boxRight}>
              <div>
                <img src={DogFoodImg} alt='Dog Food Img' />
              </div>
            </div>
          </div>
          <div className={style.boxBottomFlex}>
            <div className={style.wrapLogo}>
              <div className={style.logoBox}>
                <img src={LogoBrandImg1} alt='logoBrand RoyalCanin' />
              </div>
              <div className={style.logoBox}>
                <img src={LogoBrandImg2} alt='logoBrand ANF' />
              </div>
              <div className={style.logoBox}>
                <img src={LogoBrandImg3} alt='logoBrand NaturalCore' />
              </div>
              <div className={style.logoBox}>
                <img src={LogoBrandImg4} alt='logoBrand Nutrena' />
              </div>
              <div className={style.logoBox}>
                <img src={LogoBrandImg5} alt='logoBrand LamuDali' />
              </div>
              <div className={style.logoBox}>
                <img src={LogoBrandImg6} alt='logoBrand NaturalLab' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
