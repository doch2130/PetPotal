import { useNavigate } from 'react-router-dom';
import style from './MyBoardPostButton.module.css';

interface MyBoardPostButtonInterface {
  postPageNumber: string;
  setPostPageNumber: Function;
  totalPostCount: number;
}

export default function MyBoardPostButton(props:MyBoardPostButtonInterface) {
  const { postPageNumber, setPostPageNumber, totalPostCount } = props;
  const pageTotal = Math.ceil(totalPostCount/9);
  const navigater = useNavigate();
  const buttons: JSX.Element[] = [];
  const pageTotalNumber = Math.ceil(totalPostCount/9);
  const pageLastNumber = (Math.floor((Number(postPageNumber))/3) + 3) <= pageTotalNumber ? (Math.floor((Number(postPageNumber))/3) + 3) : pageTotalNumber;

  const changeFirstPageFunction = ():void => {
    // << 버튼
    setPostPageNumber('1');
    navigater(`/mypage/write/1`);
    return ;
  }

  const changeLastPageFunction = ():void => {
    //  >> 버튼
    setPostPageNumber(pageTotal.toString());
    navigater(`/mypage/write/${pageTotal.toString()}`);
    return ;
  }
  
  const changePrevPageFunction = ():void => {
    // < 버튼
    if(postPageNumber === '1') {
      return ;
    }
    const updateMatePageNumber = (Number(postPageNumber) - 1).toString();
    setPostPageNumber(updateMatePageNumber);
    navigater(`/mypage/write/${updateMatePageNumber}`);
    return ;
  }

  const changeNextPageFunction = ():void => {
    // > 버튼
    if(postPageNumber === pageTotal.toString()) {
      return ;
    }
    const updateMatePageNumber = (Number(postPageNumber) + 1).toString();
    setPostPageNumber(updateMatePageNumber);
    navigater(`/mypage/write/${updateMatePageNumber}`);
    return ;
  }

  const changePageNumberFunction = (changePageNumber:number):void => {
    // 숫자 버튼
    setPostPageNumber(changePageNumber.toString());
    navigater(`/mypage/write/${changePageNumber}`);
    return ;
  }

  buttons.push(
    <button type='button' key={'first'} disabled={postPageNumber === '1' ? true : false} onClick={changeFirstPageFunction}>&lt;&lt;</button>
  );
  buttons.push(
    <button type='button' key={'prev'} disabled={postPageNumber === '1' ? true : false} onClick={changePrevPageFunction}>&lt;</button>
  );
  for(let i = Math.floor((Number(postPageNumber))/3); i < pageLastNumber; i++) {
    if(Number(postPageNumber) === i+1) {
      buttons.push(
        <button type='button' key={postPageNumber} className={style.bottomPageButtonActive} onClick={() => changePageNumberFunction(i+1)}>{i+1}</button>
      )
    } else {
      buttons.push(
        <button type='button' key={postPageNumber+1} onClick={() => changePageNumberFunction(i+1)}>{i+1}</button>
      )
    }
  }
  buttons.push(
    <button type='button' key={'next'} disabled={postPageNumber === pageTotal.toString() ? true : false} onClick={changeNextPageFunction}>&gt;</button>
  );
  buttons.push(
    <button type='button' key={'last'} disabled={postPageNumber === pageTotal.toString() ? true : false} onClick={changeLastPageFunction}>&gt;&gt;</button>
  );

  return <div className={style.wrap}>{buttons}</div>;
}
