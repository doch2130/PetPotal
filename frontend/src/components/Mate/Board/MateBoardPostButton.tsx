import { useNavigate } from 'react-router-dom';
import style from './MateBoardPost.module.css';

interface MateBoardPostButtonInterface {
  matePageNumber: string;
  setMatePageNumber: Function;
  postTotalCount: number;
}

export default function MateBoardPostButton(props:MateBoardPostButtonInterface) {
  const { matePageNumber, setMatePageNumber, postTotalCount } = props;
  const navigater = useNavigate();
  const pageTotal = Math.ceil(postTotalCount/9);
  const pageTotalNumber = Math.ceil(postTotalCount/9);
  // const pageLastNumber = (Math.floor((Number(matePageNumber))/3) + 3) <= pageTotalNumber ? (Math.floor((Number(matePageNumber))/3) + 3) : pageTotalNumber;
  const pageLastNumber = Math.min((Math.floor((Number(matePageNumber) - 1) / 3) + 1) * 3, pageTotalNumber);
  const pageStartNumber = Math.max(pageLastNumber - 2, 1);
  const buttons: JSX.Element[] = [];

  const changeFirstPageFunction = ():void => {
    // << 버튼
    setMatePageNumber('1');
    navigater(`/mate/1`);
    return ;
  }

  const changeLastPageFunction = ():void => {
    //  >> 버튼
    setMatePageNumber(pageTotal.toString());
    navigater(`/mate/${pageTotal.toString()}`);
    return ;
  }
  
  const changePrevPageFunction = ():void => {
    // < 버튼
    if(matePageNumber === '1') {
      return ;
    }
    const updateMatePageNumber = (Number(matePageNumber) - 1).toString();
    setMatePageNumber(updateMatePageNumber);
    navigater(`/mate/${updateMatePageNumber}`);
    return ;
  }

  const changeNextPageFunction = ():void => {
    // > 버튼
    if(matePageNumber === pageTotal.toString()) {
      return ;
    }
    const updateMatePageNumber = (Number(matePageNumber) + 1).toString();
    setMatePageNumber(updateMatePageNumber);
    navigater(`/mate/${updateMatePageNumber}`);
    return ;
  }

  const changePageNumberFunction = (changePageNumber:number):void => {
    // 숫자 버튼
    setMatePageNumber(changePageNumber.toString());
    navigater(`/mate/${changePageNumber}`);
    return ;
  }

  buttons.push(
    <button type='button' key={'first'} disabled={matePageNumber === '1' ? true : false} onClick={changeFirstPageFunction}>&lt;&lt;</button>
  );
  buttons.push(
    <button type='button' key={'prev'} disabled={matePageNumber === '1' ? true : false} onClick={changePrevPageFunction}>&lt;</button>
  );

  for (let i = pageStartNumber; i <= pageLastNumber; i++) {
    if(Number(matePageNumber) === i) {
      buttons.push(
        <button type='button' key={i} className={style.bottomPageButtonActive} onClick={() => changePageNumberFunction(i)}>{i}</button>
      )
    } else {
      buttons.push(
        <button type='button' key={i} onClick={() => changePageNumberFunction(i)}>{i}</button>
      )
    }
  }
  buttons.push(
    <button type='button' key={'next'} disabled={matePageNumber === pageTotal.toString() ? true : false} onClick={changeNextPageFunction}>&gt;</button>
  );
  buttons.push(
    <button type='button' key={'last'} disabled={matePageNumber === pageTotal.toString() ? true : false} onClick={changeLastPageFunction}>&gt;&gt;</button>
  );

  return <>{buttons}</>;
}
