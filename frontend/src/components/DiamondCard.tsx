// import React from 'react'
import style from './DiamondCard.module.css';

export default function DiamondCard(props: any) {
  return (
    <div className={style.diamondCardWrap}>
      <div className={style.diamondCard}>
        <img src={props.iconImage} alt={props.iconImage} />
      </div>
      <div className={style.diamondCardText}>
        {props.children}
      </div>
    </div>
  )
}
