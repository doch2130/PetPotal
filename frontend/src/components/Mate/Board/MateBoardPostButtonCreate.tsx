import React from 'react'
import style from './MateBoardPost.module.css';
import { useNavigate } from 'react-router-dom';

interface MateBoardPostButtonInterface {
  postLength: number;
  pageTotal: number;
  matePageNumber: string;
  setMatePageNumber: Function;
  postTotalCount: number;
}

export default function MateBoardPostButtonCreate(props:MateBoardPostButtonInterface) {
  const { postLength, pageTotal, matePageNumber, setMatePageNumber, postTotalCount } = props;
  const navigater = useNavigate();
  const buttons: JSX.Element[] = [];

  const lastPageNumber = Math.ceil(postTotalCount/9);

  const lastNumber = (Math.floor((Number(matePageNumber))/3) + 3) <= lastPageNumber ? (Math.floor((Number(matePageNumber))/3) + 3) : lastPageNumber;

  const movePageNumberChange = (changePageNumber:number) => {
    // const updatePageNumber = Number(matePageNumber) + 1;
    // setMatePageNumber(updatePageNumber.toString());
    setMatePageNumber(changePageNumber.toString());
    navigater(`/mate/${changePageNumber}`);
  }

  // for(let i = 0; i < Math.ceil(postTotalCount/9); i++) {
  for(let i = Math.floor((Number(matePageNumber))/3); i < lastNumber; i++) {
    if(Number(matePageNumber) === i+1) {
      buttons.push(
        <button type='button' key={i} className={style.bottomPageButtonActive} onClick={() => movePageNumberChange(i+1)}>{i+1}</button>
      )
    } else {
      buttons.push(
        <button type='button' key={i} onClick={() => movePageNumberChange(i+1)}>{i+1}</button>
      )
    }
  }
  return <>{buttons}</>;
}




