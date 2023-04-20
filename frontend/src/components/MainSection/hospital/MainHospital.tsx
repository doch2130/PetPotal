// import React from 'react'
import style from './MainHospital.module.css';
import HospitalImg1 from '../../../assets/mainpage/Hospital/MainPage_Hospital_Img_1.jpg';
import HospitalImg2 from '../../../assets/mainpage/Hospital/MainPage_Hospital_Img_2.jpg';
import HospitalImg3 from '../../../assets/mainpage/Hospital/MainPage_Hospital_Img_3.jpg';

export default function MainHospital() {
  return (
    <div className={style.wrap}>
      <div>
        <div className={style.title}>
          <h1>Hospital</h1>
          <p>24 hours a day, you can quickly treat sick pets at a hospital with professional services.</p>
        </div>

        <div className={style.wrapImg}>
          <img src={HospitalImg1} alt='HospitalImg1' />  
          <img src={HospitalImg2} alt='HospitalImg2' />
          <img src={HospitalImg3} alt='HospitalImg3' />
        </div>
      </div>

        {/* <div>
          <div className={style.imgSource}>
            <a href="https://kr.freepik.com/free-photo/close-up-on-veterinarian-taking-care-of-pet_21080887.htm#query=animal hospital&position=36&from_view=search&track=ais">Freepik</a>
          </div>
          <div className={style.imgSource}>
            <a href="https://kr.freepik.com/free-photo/close-up-on-veterinarian-taking-care-of-cat_18395442.htm#query=animal hospital&from_query=동물병원&position=27&from_view=search&track=sph">Freepik</a>
          </div>
          <div className={style.imgSource}>
            <a href="https://kr.freepik.com/free-photo/veterinarian-taking-care-of-pet-dog_20823274.htm#page=3&query=animal hospital&position=18&from_view=search&track=ais">Freepik</a>
          </div>
        </div> */}
    </div>
  )
}
