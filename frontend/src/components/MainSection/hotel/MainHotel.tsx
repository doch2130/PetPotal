// import React from 'react'
import style from './MainHotel.module.css';
import MainHotelRight from './MainHotelRight';

export default function MainHotel() {
  return (
    <div className={style.wrap}>
      <div className={style.wrapCol}>
        <div className={style.wrapLeft}>
          <h1>Hotel</h1>
          <p>To keep pets from being lonely<br />
          You can find accommodations that you can go with.</p>
        </div>
      </div>

      <div className={style.wrapCol}>
        <div className={style.wrapRight}>
          <MainHotelRight />
        </div>
      </div>
      
    </div>
  )
}
