// import React from 'react'
import DiamondCard from '../../UI/DiamondCard';
import style from './MainExplanation.module.css';
import Mate from '../../../assets/mainpage/Icon/MainPage_Pet_Mate.png';
import Hospital from '../../../assets/mainpage/Icon/MainPage_Pet_Hospital.png';
import Beauty from '../../../assets/mainpage/Icon/MainPage_Pet_Beauty.png';
import Hoteling from '../../../assets/mainpage/Icon/MainPage_Pet_Hoteling.png';
import Hotel from '../../../assets/mainpage/Icon/MainPage_Pet_Hotel.png';
import Food from '../../../assets/mainpage/Icon/MainPage_Pet_Food.png';

const explanationData = [
  {
    title: 'Pet Mate',
    image: Mate,
    explanation: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit',
    imgSource: '<a href="https://www.flaticon.com/free-icons/puppy" title="puppy icons">Puppy icons created by Freepik - Flaticon</a>'
  },
  {
    title: 'Pet Hospital',
    image: Hospital,
    explanation: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit',
    imgSource: '<a href="https://www.flaticon.com/free-icons/syringe" title="syringe icons">Syringe icons created by Freepik - Flaticon</a>'
  },
  {
    title: 'Pet Beauty',
    image: Beauty,
    explanation: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit',
    imgSource: '<a href="https://www.flaticon.com/free-icons/hair" title="hair icons">Hair icons created by Freepik - Flaticon</a>'
  },
  {
    title: 'Pet Hoteling',
    image: Hoteling,
    explanation: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit',
    imgSource: '<a href="https://www.flaticon.com/kr/free-icons/" title="호텔 아이콘">호텔 아이콘 제작자: Freepik - Flaticon</a>'
  },
  {
    title: 'Pet Hotel',
    image: Hotel,
    explanation: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit',
    imgSource: '<a href="https://www.flaticon.com/free-icons/pet" title="pet icons">Pet icons created by Freepik - Flaticon</a>'
  },
  {
    title: 'Pet Food',
    image: Food,
    explanation: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit',
    imgSource: '<a href="https://www.flaticon.com/free-icons/pet" title="pet icons">Pet icons created by Freepik - Flaticon</a>'
  }
]

export default function MainExplanation() {
  return (
    <div className={style.wrap}>
      <h1>Everything you need, all in one piece!</h1>
      <div>
        {explanationData.reduce((rows:any, el, index:number) => {
          if (index % 2 === 0) rows.push([]);
          rows[rows.length-1].push(
            <DiamondCard iconImage={el.image} key={index}>
              <p>{el.title}</p>
              <span>{el.explanation}</span>
              <div className={style.imgSource}>
                {el.imgSource}
              </div>
            </DiamondCard>
          );
          return rows;
        }, []).map((row:any, index:number) => (
          <div className={style.explanationLineWrap} key={index}>
            {row}
          </div>
        )
        )}
      </div>
    </div>
  )
}
