import { MouseEvent, MouseEventHandler, useState } from 'react';
import { useConfirm } from '../../hooks/useConfirm';
import { useAlert } from '../../hooks/useAlert';
// import moment from 'moment';
import style from './AnimalCard.module.css';
// import animalImage from '../../assets/matepage/MateImg_3.png';
import emptyHeart from '../../assets/icon/empty_heart.png';
import fullHeart from '../../assets/icon/full_heart.png';
import mateDefaultImage from '../../assets/matepage/MateDefaultImage.png';

interface animalCardInterface {
  detailPostMoveHandler: Function;
  userId? : String;
  postData: MateBoardPostListInterface;
}

interface MateBoardPostListInterface {
  mateBoardIndexNumber: number;
  mateBoardTitle: string;
  mateBoardFee: number;
  mateBoardContent: string;
  mateBoardContent2: string;
  mateBoardPhotos: string;
  mateBoardCategory: number;
  mateBoardRegistDate: string;
  mateBoardModifyDate: string;
  mateBoardStatus: number;
  animalsIndexNumber?: number;
  mateBoardAddress: string;
  mateBoardAddress1: string;
  mateBoardAddress2: string;
  mateBoardAddress3: string;
  mateBoardLng: number;
  mateBoardLat: number;
}

export default function AnimalCard(props:animalCardInterface) {
  const { userId, postData, detailPostMoveHandler } = props;
  const [ heart, setHeart ] = useState<Boolean>(false);
  const { openConfirm, closeConfirm } = useConfirm();
  const { openAlert } = useAlert();
  const [ postRepresentativeImage, setPostRepresentativeImage ] = useState<string>(postData.mateBoardPhotos === null || undefined ? '' : postData.mateBoardPhotos.split(',')[0]);

  const postHeartHandler = (event:MouseEvent) => {
    // 상위 엘리먼트들로의 이벤트 전파를 중단
    event.stopPropagation();
    if(userId !== '' && userId !== undefined) {
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
    } else {
      openAlert({
        title: 'mateBoardHeart Login',
        type: 'error',
        content: '로그인 이후 사용할 수 있습니다'
      });
    }
  }
  
  const heartStyle = `${style.heart} ${heart ? style.heartActive : ''}`;

  return (
    <div className={style.wrap} onClick={detailPostMoveHandler as MouseEventHandler}>
      <div className={style.image}>
        {/* <img src={animalImage} alt='animalImage' /> */}
        {postData.mateBoardPhotos === '' ? <img src={mateDefaultImage} alt='mateDefaultImage' /> :
        <img src={`${process.env.REACT_APP_BACK_AXIOS}/static3/${postRepresentativeImage}`} alt='postData.mateBoardPhotos' />}
        {heart ? <img src={fullHeart} alt='fullHeart' className={heartStyle} onClick={postHeartHandler}/> 
        : <img src={emptyHeart} alt='emptyHeart' className={heartStyle} onClick={postHeartHandler}/> }
        {/* <img src={fullHeart} alt='fullHeart' /> */}
      </div>
      <div className={style.wrapText}>
        <div className={style.wrapCategory}>
          {/* <p>구함</p> */}
          <p>{postData.mateBoardCategory === 1 ? '구함' : '지원'}</p>
          {/* <p>100,000원</p> */}
          <p>{postData.mateBoardFee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</p>
        </div>
        <div className={style.title}>
          {/* <p>강아지 산책하실분 구합니다.강아지 산책하실분 구합니다.</p> */}
          <p>{postData.mateBoardTitle}</p>
        </div>
        <div className={style.region}>
          {/* <p>서울시 마포구</p> */}
          {/* <p>{postData.mateBoardAddress}</p> */}
          <p>{`${postData.mateBoardAddress1} ${postData.mateBoardAddress2} ${postData.mateBoardAddress3}`}</p>
        </div>
        <div className={style.time}>
          {/* <p>2023-04-17 18:22</p> */}
          {/* <p>{`${postData.mateBoardRegistDate.split('T')[0].split('-')[0]}-${postData.mateBoardRegistDate.split('T')[0].split('-')[1]}-${postData.mateBoardRegistDate.split('T')[0].split('-')[2]} ${postData.mateBoardRegistDate.split('T')[1].split(':')[0]}:${postData.mateBoardRegistDate.split('T')[1].split(':')[1]}`}</p> */}
          {/* <p>{moment(postData?.mateBoardRegistDate).format('YYYY-MM-DD HH:mm')}</p> */}
          <p>{`${postData.mateBoardRegistDate.split('T')[0]} ${postData.mateBoardRegistDate.split('T')[1].split(':')[0]}:${postData.mateBoardRegistDate.split('T')[1].split(':')[1]}`}</p>
        </div>
      </div>
    </div>
  )
}
