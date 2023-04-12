// import React from 'react'
import Card from '../../UI/Card';
import style from './MainMate.module.css';
import MateImg1 from '../../../assets/mainpage/Mate/MainPage_Mate_Img_1.jpg';
import MateImg2 from '../../../assets/mainpage/Mate/MainPage_Mate_Img_2.jpg';
import MateImg3 from '../../../assets/mainpage/Mate/MainPage_Mate_Img_3.jpg';
import MateImg4 from '../../../assets/mainpage/Mate/MainPage_Mate_Img_4.jpg';

const cardData = [
  {
    id: 1,
    image: MateImg1,
    imgSource: '<a href="https://kr.freepik.com/free-photo/two-stylish-girls-in-a-sunny-field-with-dogs_8355909.htm#page=5&query=강아지 산책&position=18&from_view=search&track=ais">작가 prostooleh</a> 출처 Freepik'
  },
  {
    id: 2,
    image: MateImg2,
    imgSource: '<a href="https://kr.freepik.com/free-photo/morning-walk-with-dog_7120634.htm#page=8&query=동물 산책&position=42&from_view=search&track=ais">작가 ArthurHidden</a> 출처 Freepik'
  },
  {
    id: 3,
    image: MateImg3,
    imgSource: '<a href="https://kr.freepik.com/free-photo/girl-with-dog_1469517.htm#page=5&query=강아지 산책&position=23&from_view=search&track=ais">작가 senivpetro</a> 출처 Freepik'
  },
  {
    id: 4,
    image: MateImg4,
    imgSource: '<a href="https://kr.freepik.com/free-photo/small-girl-feeding-her-beagle-dot-in-park_3858403.htm#query=동물 산책&position=34&from_view=search&track=ais">Freepik</a>'
  }
]

export default function MainMate() {
  return (
    <div className={style.wrap}>
      <div className={style.body}>
        <h1 className={style.title}>Mate</h1>
        <p className={style.subTitle}>
          Lorem ipsum dolor sit amet consectetur<br />
          adipisicing elit. Sit, sint minus vel neque sed sol
        </p>

        <div className={style.wrapCard}>
          { cardData.map((el) => <Card key={el.id}><img src={el.image} alt={el.image} /></Card> )}
        </div>
      </div>
    </div>
  )
}
