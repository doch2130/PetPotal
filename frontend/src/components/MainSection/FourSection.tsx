// import React from 'react'
import style from './FourSection.module.css';
import HospitalImg1 from '../../assets/mainpage/Hospital/MainPage_Hospital_Img_1.jpg';
import HospitalImg2 from '../../assets/mainpage/Hospital/MainPage_Hospital_Img_2.jpg';
import HospitalImg3 from '../../assets/mainpage/Hospital/MainPage_Hospital_Img_3.jpg';

export default function FourSection() {
  return (
    <div className={style.wrap}>
      <div className={style.title}>
        <h1>Hospital</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Sit, sint minus vel neque sed soluta accu</p>
      </div>
      <div className={style.imgWrap}>
        <img src={HospitalImg1} alt='HospitalImg1' />
        <img src={HospitalImg2} alt='HospitalImg2' />
        <img src={HospitalImg3} alt='HospitalImg3' />
      </div>
    </div>
  )
}
