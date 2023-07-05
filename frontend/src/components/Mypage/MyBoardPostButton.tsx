import { useNavigate } from 'react-router-dom';
import style from './MyBoardPostButton.module.css';

interface MyBoardPostButtonInterface {
  postPageNumber: string;
  setPostPageNumber: Function;
  totalPostCount: number;
  pageUrl: string;
}

export default function MyBoardPostButton(props:MyBoardPostButtonInterface) {
  const { postPageNumber, setPostPageNumber, totalPostCount, pageUrl } = props;
  const navigater = useNavigate();
  const pageTotal = Math.ceil(totalPostCount/8);
  const pageTotalNumber = Math.ceil(totalPostCount/8);
  const pageLastNumber = Math.min((Math.floor((Number(postPageNumber) - 1) / 3) + 1) * 3, pageTotalNumber);
  const pageStartNumber = Math.max(pageLastNumber - 2, 1);
  const buttons: JSX.Element[] = [];

  const changeFirstPageFunction = ():void => {
    // << 버튼
    setPostPageNumber('1');
    navigater(`${pageUrl}/1`);
    return ;
  }

  const changeLastPageFunction = ():void => {
    //  >> 버튼
    setPostPageNumber(pageTotal.toString());
    navigater(`${pageUrl}/${pageTotal.toString()}`);
    return ;
  }
  
  const changePrevPageFunction = ():void => {
    // < 버튼
    if(postPageNumber === '1') {
      return ;
    }
    const updateMatePageNumber = (Number(postPageNumber) - 1).toString();
    setPostPageNumber(updateMatePageNumber);
    navigater(`${pageUrl}/${updateMatePageNumber}`);
    return ;
  }

  const changeNextPageFunction = ():void => {
    // > 버튼
    if(postPageNumber === pageTotal.toString()) {
      return ;
    }
    const updateMatePageNumber = (Number(postPageNumber) + 1).toString();
    setPostPageNumber(updateMatePageNumber);
    navigater(`${pageUrl}/${updateMatePageNumber}`);
    return ;
  }

  const changePageNumberFunction = (changePageNumber:number):void => {
    // 숫자 버튼
    setPostPageNumber(changePageNumber.toString());
    navigater(`${pageUrl}/${changePageNumber}`);
    return ;
  }

  buttons.push(
    <button type='button' key={'first'} disabled={postPageNumber === '1' ? true : false} onClick={changeFirstPageFunction}>&lt;&lt;</button>
  );
  buttons.push(
    <button type='button' key={'prev'} disabled={postPageNumber === '1' ? true : false} onClick={changePrevPageFunction}>&lt;</button>
  );

  for (let i = pageStartNumber; i <= pageLastNumber; i++) {
    if(Number(postPageNumber) === i) {
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
    <button type='button' key={'next'} disabled={postPageNumber === pageTotal.toString() ? true : false} onClick={changeNextPageFunction}>&gt;</button>
  );
  buttons.push(
    <button type='button' key={'last'} disabled={postPageNumber === pageTotal.toString() ? true : false} onClick={changeLastPageFunction}>&gt;&gt;</button>
  );

  return <div className={style.wrap}>{buttons}</div>;

}
