// import React from 'react'
import style from './Card.module.css';

export default function Card(props:any) {
  return (
    <div className={style.card}>
      {props.children}
    </div>
  )
}
