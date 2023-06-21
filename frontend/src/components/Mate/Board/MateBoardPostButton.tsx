import { useNavigate } from 'react-router-dom';
import MateBoardPostButtonCreate from './MateBoardPostButtonCreate';

interface MateBoardPostButtonInterface {
  postLength: number;
  matePageNumber: string;
  setMatePageNumber: Function;
  postTotalCount: number;
}

export default function MateBoardPostButton(props:MateBoardPostButtonInterface) {
  const { postLength, matePageNumber, setMatePageNumber } = props;
  const pageTotal = Math.ceil(postLength/9);
  const navgiter = useNavigate();
  // console.log('postLength ', postLength);


  // const render = () => {
  //   const pageTotal = Math.ceil(postLength/9);
  //   console.log('pageTotal ', pageTotal);
  // }
  // render();

  const firstPageButton = () => {
    setMatePageNumber('1');
  }
  const lastPageButton = () => {
    setMatePageNumber(pageTotal.toString());
  }
  const prevPageButton = () => {
    if(matePageNumber === '1') {
      return ;
    }
    const updateMatePageNumber = (Number(matePageNumber) - 1).toString();
    setMatePageNumber(updateMatePageNumber);
    navgiter(`/mate/${updateMatePageNumber}`);
  }
  const nextPageButton = () => {
    if(matePageNumber === pageTotal.toString()) {
      return ;
    }
    const updateMatePageNumber = (Number(matePageNumber) + 1).toString();
    setMatePageNumber(updateMatePageNumber);
    navgiter(`/mate/${updateMatePageNumber}`);
  }

  const numberPageButton = () => {
  }

  return (
    <>
      <button type='button' disabled={matePageNumber === '1' ? true : false} onClick={firstPageButton}>&lt;&lt;</button>
      <button type='button' disabled={matePageNumber === '1' ? true : false} onClick={prevPageButton}>&lt;</button>
      {/* <button type='button' className={style.bottomPageButtonActive}>1</button> */}
      {/* <button type='button'>2</button> */}
      {/* <button type='button'>3</button> */}
      <MateBoardPostButtonCreate postLength={postLength} pageTotal={pageTotal} matePageNumber={matePageNumber} setMatePageNumber={setMatePageNumber} postTotalCount={props.postTotalCount} />
      <button type='button' disabled={matePageNumber === pageTotal.toString() ? true : false} onClick={nextPageButton}>&gt;</button>
      <button type='button' disabled={matePageNumber === pageTotal.toString() ? true : false} onClick={lastPageButton}>&gt;&gt;</button>
    </>
  )
}
