import style from './AnimalCard.module.css';
import testImage from '../../assets/matepage/MateImg_3.png';
import emptyHeart from '../../assets/icon/empty_heart.png';
import fullHeart from '../../assets/icon/full_heart.png';
import { MouseEventHandler } from 'react';

interface animalCardInterface {
  detailPostMoveHandler: Function;
}

export default function AnimalCard(props:animalCardInterface) {
  return (
    <div className={style.wrap} onClick={props.detailPostMoveHandler as MouseEventHandler}>
      <div className={style.image}>
        <img src={testImage} alt='testImage' />
        <img src={emptyHeart} alt='emptyHeart'  />
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
