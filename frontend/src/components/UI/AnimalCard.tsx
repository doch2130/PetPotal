import style from './AnimalCard.module.css';
import animalImage from '../../assets/matepage/MateImg_3.png';
import emptyHeart from '../../assets/icon/empty_heart.png';
import fullHeart from '../../assets/icon/full_heart.png';
import { MouseEventHandler, useState } from 'react';
import { useConfirm } from '../../hooks/useConfirm';

interface animalCardInterface {
  detailPostMoveHandler: Function;
}

export default function AnimalCard(props:animalCardInterface) {
  const [ heart, setHeart ] = useState<Boolean>(false);
  const { openConfirm, closeConfirm } = useConfirm();
  const postHeartHandler = (event:any) => {
    // 상위 엘리먼트들로의 이벤트 전파를 중단
    event.stopPropagation();
    if(heart) {
      openConfirm({
        title: 'mateBoardHeart',
        content: '좋아요를 해제하시겠습니까?',
        callback: () => {
          setHeart(false);
          closeConfirm();
        }
      });
    } else {
      openConfirm({
        title: 'mateBoardHeart',
        content: '좋아요를 등록하시겠습니까?',
        callback: () => {
          setHeart(true);
          closeConfirm();
        }
      });
    }
  }

  const heartStyle = `${style.heart} ${heart ? style.heartActive : ''}`;

  return (
    <div className={style.wrap} onClick={props.detailPostMoveHandler as MouseEventHandler}>
      <div className={style.image}>
        <img src={animalImage} alt='animalImage' />
        {heart ? <img src={fullHeart} alt='fullHeart' className={heartStyle} onClick={postHeartHandler}/> 
        : <img src={emptyHeart} alt='emptyHeart' className={heartStyle} onClick={postHeartHandler}/> }
        {/* <img src={fullHeart} alt='fullHeart' /> */}
      </div>
      <div className={style.wrapText}>
        <div className={style.wrapCategory}>
          <p>구함</p>
          <p>100,000원</p>
        </div>
        <div className={style.title}>
          <p>강아지 산책하실분 구합니다.강아지 산책하실분 구합니다.</p>
        </div>
        <div className={style.region}>
          <p>서울시 마포구</p>
        </div>
        <div className={style.time}>
          <p>2023-04-17 18:22</p>
        </div>
      </div>
    </div>
  )
}
