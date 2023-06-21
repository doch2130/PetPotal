import React from 'react'
import style from './MateBoardPost.module.css';

interface MateBoardPostButtonInterface {
  postLength: number;
  pageTotal: number;
  matePageNumber: string;
  setMatePageNumber: Function;
  postTotalCount: number;
}

export default function MateBoardPostButtonCreate(props:MateBoardPostButtonInterface) {
  const { postLength, pageTotal, matePageNumber, setMatePageNumber, postTotalCount } = props;
  const buttons: JSX.Element[] = [];

  const lastPageNumber = Math.ceil(postTotalCount/9);

  // for(let i = 0; i < Math.ceil(postTotalCount/9); i++) {
  for(let i = Math.floor((Number(matePageNumber)-1)/3); i < lastPageNumber; i++) {
    if(Number(matePageNumber) === i+1) {
      buttons.push(
        <button type='button' key={i} className={style.bottomPageButtonActive}>{i+1}</button>
      )
    } else {
      buttons.push(
        <button type='button' key={i}>{i+1}</button>
      )
    }
  }
  return <>{buttons}</>;
}




