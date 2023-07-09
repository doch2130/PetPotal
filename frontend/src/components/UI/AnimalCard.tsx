import { MouseEvent, MouseEventHandler, useEffect, useState } from 'react';
import { useConfirm } from '../../hooks/useConfirm';
import { useAlert } from '../../hooks/useAlert';
import mateDefaultImage from '../../assets/matepage/MateDefaultImage.png';
import emptyHeart from '../../assets/icon/empty_heart.png';
import fullHeart from '../../assets/icon/full_heart.png';
import style from './AnimalCard.module.css';
import Controller from '../../api/controller';

interface animalCardInterface {
  detailPostMoveHandler: Function;
  userId? : String;
  postData: MateBoardPostListInterface;
  setMyMateInterestBoardList?: Function;
  myMateInterestBoardList?: MateBoardPostListInterface[];
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
  InterestPost?: Array<MateInterestPostInterface>;
}

interface MateInterestPostInterface {
  interestPostStatus?: number;
}

export default function AnimalCard(props:animalCardInterface) {
  const { userId, postData, detailPostMoveHandler } = props;
  const { openConfirm, closeConfirm } = useConfirm();
  const { openAlert } = useAlert();
  const [ postRepresentativeImage, setPostRepresentativeImage ] = useState<string>(postData.mateBoardPhotos === null || postData.mateBoardPhotos === undefined ? '' : postData.mateBoardPhotos.split(',')[0]);
  const [ postHeart, setPostHeart ] = useState<Boolean>(postData.InterestPost === undefined || postData.InterestPost?.length === 0 ? false : true);
  const controller = new Controller();
  
  const postHeartHandler = (event:MouseEvent) => {
    // 상위 엘리먼트들로의 이벤트 전파를 중단
    event.stopPropagation();
    // openAlert({
    //   title: 'mateBoardHeart preparing',
    //   type: 'error',
    //   content: '서비스 준비 중입니다.',
    // });
    if(userId !== '' && userId !== undefined) {
      if(postHeart) {
        openConfirm({
          content: '좋아요를 해제하시겠습니까?',
          callback: async () => {
            setPostHeart(false);
            closeConfirm();
            try {
              // const result = await controller.matePostInterest(postData.mateBoardIndexNumber, 'delete');
              await controller.matePostInterest(postData.mateBoardIndexNumber, 'delete');
              // console.log('result ', result);
              setPostHeart(false);

              // 마이 페이지 - 데이터 표시 반응 (React-Query 아니라서 해야함)
              if(props.myMateInterestBoardList !== undefined && props.setMyMateInterestBoardList !== undefined) {
                const filterPost = props.myMateInterestBoardList?.filter((el:MateBoardPostListInterface) => el.mateBoardIndexNumber !== postData.mateBoardIndexNumber);
                // console.log('filterPost ', filterPost);
                props.setMyMateInterestBoardList(filterPost);
              }
              return ;
            } catch (err) {
              openAlert({
                type: 'error',
                content: '에러가 발생하였습니다.\r\n새로고침 후 다시 시도해주세요.',
              });
              return ;
            }
          }
        });
      } else {
        openConfirm({
          content: '좋아요를 등록하시겠습니까?',
          callback: async () => {
            setPostHeart(true);
            closeConfirm();
            try {
              // const result = await controller.matePostInterest(postData.mateBoardIndexNumber, 'add');
              await controller.matePostInterest(postData.mateBoardIndexNumber, 'add');
              // console.log('result ', result);
              setPostHeart(true);
              return ;
            } catch (err) {
              openAlert({
                type: 'error',
                content: '에러가 발생하였습니다.\r\n새로고침 후 다시 시도해주세요.',
              });
              return ;
            }
          }
        });
      }
    } else {
      openAlert({
        type: 'error',
        content: '로그인 이후 사용할 수 있습니다'
      });
      return ;
    }
  }
  
  const heartStyle = `${style.heart} ${postHeart ? style.heartActive : ''}`;

  useEffect(():void => {
    setPostHeart(postData.InterestPost === undefined || postData.InterestPost?.length === 0 ? false : true);
    return ;
  }, [postData.InterestPost]);

  useEffect(() => {
    setPostRepresentativeImage(postData.mateBoardPhotos.split(',')[0] || '');
  }, [postData.mateBoardPhotos]);

  return (
    <div className={style.wrap} onClick={detailPostMoveHandler as MouseEventHandler}>
      <div className={style.image}>
        {postData.mateBoardPhotos === '' ? <img src={mateDefaultImage} alt='mateDefaultImage' /> :
        <img src={`${process.env.REACT_APP_BACK_AXIOS}/static3/${postRepresentativeImage}`} alt='postData.mateBoardPhotos' />}

        {postHeart ? <img src={fullHeart} alt='fullHeart' className={heartStyle} onClick={postHeartHandler}/> 
        : <img src={emptyHeart} alt='emptyHeart' className={heartStyle} onClick={postHeartHandler}/> }

      </div>
      <div className={style.wrapText}>
        <div className={style.wrapCategory}>
          <p>{postData.mateBoardCategory === 1 ? '구함' : '지원'}</p>
          <p>{postData.mateBoardFee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</p>
        </div>
        <div className={style.title}>
          <p>{postData.mateBoardTitle}</p>
        </div>
        <div className={style.region}>
          <p>{`${postData.mateBoardAddress1} ${postData.mateBoardAddress2} ${postData.mateBoardAddress3}`}</p>
        </div>
        <div className={style.time}>
          <p>{`${postData.mateBoardRegistDate.split('T')[0]} ${postData.mateBoardRegistDate.split('T')[1].split(':')[0]}:${postData.mateBoardRegistDate.split('T')[1].split(':')[1]}`}</p>
        </div>
      </div>
    </div>
  )
}
