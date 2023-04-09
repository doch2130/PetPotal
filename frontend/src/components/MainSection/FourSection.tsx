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
        <div className={style.imgSubWrap}>
          <img src={HospitalImg1} alt='HospitalImg1' />
          <div className={style.imgSource}>
            <a href="https://kr.freepik.com/free-photo/close-up-on-veterinarian-taking-care-of-pet_21080887.htm#query=animal hospital&position=36&from_view=search&track=ais">Freepik</a>
          </div>
          <img src={HospitalImg2} alt='HospitalImg2' />
          <div className={style.imgSource}>
            <a href="https://kr.freepik.com/free-photo/close-up-on-veterinarian-taking-care-of-cat_18395442.htm#query=animal hospital&from_query=동물병원&position=27&from_view=search&track=sph">Freepik</a>
          </div>
          <img src={HospitalImg3} alt='HospitalImg3' />
          <div className={style.imgSource}>
            <a href="https://kr.freepik.com/free-photo/veterinarian-taking-care-of-pet-dog_20823274.htm#page=3&query=animal hospital&position=18&from_view=search&track=ais">Freepik</a>
          </div>
        </div>
      </div>
    </div>
  )
}
