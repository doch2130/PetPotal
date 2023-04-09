// import React from 'react'
import DogImage from '../../assets/mainpage/MainPage_Dog.png';
// import CatImage from '../../assets/mainpage/MainPage_Cat.png';
import style from './FirstSection.module.css';

export default function FirstSection() {
  return (
    <>
      <div className={style.wrap}>
        <div className={style.wrapCol}>
          <div className={style.wrapImg}>
            <img src={DogImage} alt='DogImage' />
          </div>
        </div>
        <div className={style.wrapCol}>
          <div className={style.wrapText}>
            <h1>Lorem ipsum</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non velit earum, neque, accusantium aliquam nihil ullam eius quibusdam id animi delectus rem. Dicta deserunt voluptas, velit quia et molestias nostrum.</p>
          </div>
        </div>
      </div>
    </>
  )
}
