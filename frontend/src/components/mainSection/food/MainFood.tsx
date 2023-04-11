// import React from 'react'
import style from './MainFood.module.css';
import DogFoodImg from '../../../assets/mainpage/Food/MainPage_Food_Img_1.png';
import LogoBrandImg1 from '../../../assets/mainpage/Food/RoyalCanin.png';
import LogoBrandImg2 from '../../../assets/mainpage/Food/ANF.png';
import LogoBrandImg3 from '../../../assets/mainpage/Food/NaturalCore.png';
import LogoBrandImg4 from '../../../assets/mainpage/Food/Nutrena.png';
import LogoBrandImg5 from '../../../assets/mainpage/Food/LamuDali.png';
import LogoBrandImg6 from '../../../assets/mainpage/Food/NaturalLab.png';

const logoBrand = [
  {
    id: 1,
    img: LogoBrandImg1,
    text: 'RoyalCanin'
  },
  {
    id: 2,
    img: LogoBrandImg2,
    text: 'ANF'
  },
  {
    id: 3,
    img: LogoBrandImg3,
    text: 'NaturalCore'
  },
  {
    id: 4,
    img: LogoBrandImg4,
    text: 'Nutrena'
  },
  {
    id: 5,
    img: LogoBrandImg5,
    text: 'LamuDali'
  },
  {
    id: 6,
    img: LogoBrandImg6,
    text: 'NaturalLab'
  },
]

export default function MainFood() {
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
              { logoBrand.map((el) => <div className={style.logoBox}><img src={el.img} alt={el.text} /></div>) }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
