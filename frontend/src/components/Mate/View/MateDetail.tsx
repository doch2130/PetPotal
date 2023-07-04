import { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { UserType, userState } from '../../../recoil/user';
import { useModal } from '../../../hooks/useModal';
import { Params, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAlert } from '../../../hooks/useAlert';
// import moment from 'moment';
import Controller from '../../../api/controller';
// import geocoding from '../../../api/geocoding';
import PictureBox from '../../UI/PictureBox';
import MateDetailMap from './MateDetailMap';
import style from './MateDetail.module.css';

import emptyHeart from '../../../assets/icon/empty_heart.png';
import share from '../../../assets/icon/share.png';
import star from '../../../assets/icon/star.png';
import interest from '../../../assets/icon/people.png';
import chatting from '../../../assets/icon/chatting.png';
import locationMap from '../../../assets/icon/location_map.png';
import mateDefaultImage from '../../../assets/matepage/MateDefaultImage.png';
import { useConfirm } from '../../../hooks/useConfirm';

interface mapData {
  x: number;
  y: number;
  _lng: number;
  _lat: number;
}

export default function MateDetail() {
  const [mouseDownClientX, setMouseDownClientX] = useState<number>(0);
  const [mouseDownClientY, setMouseDownClientY] = useState<number>(0);
  const [mouseUpClientX, setMouseUpClientX] = useState<number>(0);
  const [mouseUpClientY, setMouseUpClientY] = useState<number>(0);
  const userInfo = useRecoilValue<UserType[]>(userState);
  const [ mapData, setMapData ] = useState<mapData>({
    x: 0,
    y: 0,
    _lng: 0,
    _lat: 0,
  });
  const { openModal } = useModal();
  const { openConfirm, closeConfirm } = useConfirm();
  const [imgUrl, setImgUrl] = useState<string[]>([
    '/static/media/MainPage_Dog.1d0a30c4b1704ee37ebf.png',
    '/static/media/MainPage_Cat.9fed3dbb00482ebb7bdf.png',
  ]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const slideRef = useRef<any>([]);
  const historyValue = useParams<Params<string>>();
  const [ matePostDetailNumber, setMatePostDetailNumber ] = useState<number | null>(null);
  const controller = new Controller();
  const { openAlert } = useAlert();
  const navigater = useNavigate();

  const onMouseDown = useCallback((e: React.MouseEvent<HTMLElement, MouseEvent>):void => {
    setMouseDownClientX(e.clientX);
    setMouseDownClientY(e.clientY);
    return ;
  }, []);

  const onMouseUp = useCallback((e: React.MouseEvent<HTMLElement, MouseEvent>):void => {
    setMouseUpClientX(e.clientX);
    setMouseUpClientY(e.clientY);
    return ;
  }, []);

  const handleNextBtn = ():void => {
    if(imgUrl.length === 1) {
      return ;
    }

    if(currentIdx === imgUrl.length-1) {
      setCurrentIdx(0);
      slideRef.current.forEach((el:any) => {
        if(el !== null) {
          el.style.transition = "all 0.5s ease-in-out";
          el.style.transform = `translateX(0px)`;
        }
        
      });
    } else {
      setCurrentIdx((prev:number) => prev + 1);
      slideRef.current.forEach((el:any) => {
        if(el !== null) {
          el.style.transition = "all 0.5s ease-in-out";
          el.style.transform = `translateX(-${200 * (currentIdx + 1)}px)`;
        }
      });
    }
    return ;
  };

  const handlePrevBtn = ():void => {
    if(imgUrl.length === 1) {
      return ;
    }

    if(currentIdx === 0) {
      setCurrentIdx(imgUrl.length-1);
      slideRef.current.forEach((el:any) => {
        if(el !== null) {
          el.style.transition = "all 0.5s ease-in-out";
          el.style.transform = `translateX(-${200 * (imgUrl.length-1)}px)`;
        }
      });
    } else {
      setCurrentIdx((prev:number) => prev - 1);
      slideRef.current.forEach((el:any) => {
        if(el !== null) {
          el.style.transition = "all 0.5s ease-in-out";
          el.style.transform = `translateX(-${200 * (currentIdx-1)}px)`;
        }
      });
    }
    return ;
  };

  const modalMapOpen = ():void => {
    openModal({
      backDrop: true,
      content: <MateDetailMap height='350px' mapData={mapData} zoomControl={false} />
    });
    return ;
  }

  useEffect(():void => {
    const dragSpaceX = Math.abs(mouseDownClientX - mouseUpClientX);
    const dragSpaceY = Math.abs(mouseDownClientY - mouseUpClientY);
    const vector = dragSpaceX / dragSpaceY;

    if (mouseDownClientX !== 0 && dragSpaceX > 100 && vector > 2) {
      if (mouseUpClientX < mouseDownClientX) {
        handleNextBtn();
      } else if (mouseUpClientX > mouseDownClientX) {
        handlePrevBtn();
      }
    }
    return ;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mouseUpClientX]);

  useEffect(():void => {
    const historyKeyword = Number(historyValue.matePostNumber);
    if(historyKeyword) {
      setMatePostDetailNumber(historyKeyword);
    }
    return ;
  }, [historyValue]);

  // React Query default
  const fetchMateBoardDetail = async (matePostDetailNumber:string) => {
    try {
      const result = await controller.mateBoardDetailPost(matePostDetailNumber);
      return result.data;
    } catch (err) {
      openAlert({
        title: '게시글 상세 조회 에러',
        type: 'error',
        content: '데이터 로딩 중 에러가 발생하였습니다.\r\n새로고침 후 이용부탁드립니다.',
      });
      return ;
    }
  }

  const { status, data, error, refetch } = useQuery(
    [`mateBoardPostDetail`, matePostDetailNumber], () => fetchMateBoardDetail(String(matePostDetailNumber)),
    { enabled: false } //초기에 데이터 요청을 하지 않음
  );

  useEffect(() => {
    if(matePostDetailNumber) {
      refetch();
    }
  }, [matePostDetailNumber, refetch]);

  useEffect(() => {
    // console.log('data? ', data);
    // console.log('data?.data ', data?.data);

    const tempMateBoardPhotos = data?.data.mateBoardPhotos.split(',');
    let tempImgUrl: string[] = [];
    tempMateBoardPhotos?.forEach((el:any) => {
      const update = `${process.env.REACT_APP_BACK_AXIOS}/static3/${el}`;
      tempImgUrl.push(update);
    });
    setImgUrl(tempImgUrl);

    if(data?.data.mateBoardPhotos === '') {
      setImgUrl([mateDefaultImage]);
    }

    if(data?.data.mateBoardLat && data?.data.mateBoardLng) {
      setMapData({
        x: data?.data.mateBoardLng,
        y: data?.data.mateBoardLat,
        _lng: data?.data.mateBoardLng,
        _lat: data?.data.mateBoardLat,
      });
    }

    // const mapGeocoding = async () => {
    //   const address = (`${data?.data.mateBoardAddress1} ${data?.data.mateBoardAddress2} ${data?.data.mateBoardAddress3} ${data?.data.mateBoardAddress4}`).trim();
    //   console.log('address ', address);
    //   if (address !== '') {
    //     try {
    //       // const result = await controller.naverMapGeocoding(address);
    //       const result = await geocoding(address);
    //       console.log('result ', result);
    //       // setMapData({
    //       //   x: result.data[0],
    //       //   y: result.data[1],
    //       //   _lng: result.data[0],
    //       //   _lat: result.data[1],
    //       // });
    //     } catch (err) {
    //       openAlert({
    //         title: '맵 지오코딩 에러',
    //         type: 'error',
    //         content: '',
    //       });
    //     }
    //   }
    // }

    // if(data) {
    //   mapGeocoding();
    //   setMapData({
    //     x: data?.data.mateBoardLng,
    //     y: data?.data.mateBoardLat,
    //     _lng: data?.data.mateBoardLng,
    //     _lat: data?.data.mateBoardLat,
    //   });
    // }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if(status === 'loading') return <div className={style.reactQueryLoading}>Data Loading...</div>

  if(error) return <div className={style.reactQueryError}>Data Load Error</div>

  const matePostDelete = async (mateBoardIndexNumber:number):Promise<void> => {
    openConfirm({
      title: '메이트 글 삭제',
      content: '해당 글을 삭제하시겠습니까?',
      callback: async () => {
        try {
          // const result = await controller.mateBoardDeletePost(mateBoardIndexNumber);
          await controller.mateBoardDeletePost(mateBoardIndexNumber);
          closeConfirm();
          openAlert({
            title: '메이트 글 삭제 성공',
            type: 'success',
            content: '해당 글이 삭제되었습니다.',
          });
          navigater('/mate/1');
          return ;
        } catch (err:any) {
          closeConfirm();
          openAlert({
            title: '메이트 글 삭제 에러',
            type: 'error',
            content: '글 삭제 중 에러가 발생하였습니다.\r\n새로고침 후 다시 시도해주세요.',
          });
          return ;
        }
      }
    });
  }

  const matePostUpdate = (mateBoardIndexNumber:number):void => {
    openConfirm({
      title: '메이트 글 수정',
      content: '해당 글을 수정하시겠습니까?',
      callback: () => {
        closeConfirm();
        navigater(`/mate/detail/update/${mateBoardIndexNumber}`);
      }
    });
  }
  return (
    <>
    <div className={style.wrap}>
      <div className={style.top}>
        <img src={emptyHeart} alt='emptyHeart' />
        <img src={share} alt='share' />
      </div>
      <div className={style.body}>
        {/* 사진 */}
        <div className={style.wrapPreview} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
          <PictureBox width='200px' height='200px'>
            {imgUrl.map((el:any, index:number) => {
              return (
              <div style={{cursor: 'grab'}} key={index} ref={(el) => slideRef.current[index] = el}>
                <img src={el} alt={el} />
              </div>
              );
            })}
            {imgUrl.length > 0 &&
            <div className={style.pictureCount}>
              <span>{currentIdx+1}</span>
              <span>/</span>
              <span>{imgUrl.length}</span>
            </div>
            }
          </PictureBox>
        </div>
        {/* 내용 */}
        <div className={style.contentWrap}>
          {/* <h2>나비</h2> */}
          <h2>{data?.data.Animals?.animalsName}</h2>
          <div className={style.genderAge}>
            {/* <p>암컷</p> */}
            {/* <p>11세</p> */}
            {data?.data.Animals && <p>{data?.data.Animals?.animalsGender === 1 ? '수컷' : '암컷'}</p>}
            {data?.data.Animals && <p>{data?.data.Animals?.animalsAge}세</p>}
          </div>
          <div className={style.breed}>
            {/* <p>트레디셔널 페르시안</p> */}
            <p>{data?.data.Animals?.animalsCategory2}</p>
          </div>
          <div className={style.grade}>
            <img src={star} alt='star' />
            <p>4.6 (123)</p>
          </div>
          <div className={style.interest}>
            <img src={interest} alt='interest' />
            <p>97명</p>
            <p>이 이 글에 관심을 가지고 있어요!</p>
          </div>
          {/* 채팅, 위치 버튼 */}
          <div className={style.buttonGroup}>
            <div>
              <img src={chatting} alt='chatting' />
              <span>연락하기</span>
            </div>
            <div onClick={modalMapOpen}>
              <img src={locationMap} alt='locationMap' />
              <span>위치보기</span>
            </div>
          </div>
          {/* 내용 2 */}
          <div className={style.title}>
            <p>제목</p>
            {/* <p>강아지 제목입니다.</p> */}
            <p>{data?.data.mateBoardTitle}</p>
          </div>
          <div className={style.content1}>
            <p>세부내용</p>
            {/* <pre> */}
            <pre dangerouslySetInnerHTML={{__html: data?.data.mateBoardContent1}}>
              {/* <p>날짜 : 202-04-15 토요일</p>
              <p>시간 : 16시 ~ 17시</p>
              <p>급여 : 10,000원</p>
              <p> </p>
              <p>주요 내용 :</p>
              <p>1시간 동안 공원에서 산책 시켜주시면 됩니다.</p> */}
            </pre>
          </div>
          <div className={style.content2}>
            <p>*주의사항</p>
            {/* <pre> */}
            <pre dangerouslySetInnerHTML={{__html: data?.data.mateBoardContent2}}>
              {/* <p>공격성이 어느 정도 있는 고양이 입니다. 그래서 초보자 분은 하기 힘드실 수 있습니다.</p>
              <p>그리고 심장이 안좋아서 약을 먹고 있습니다.</p> */}
            </pre>
          </div>
          <div className={style.locationMap}>
            <p>상세 위치 안내</p><br />
            <p>{`${data?.data.mateBoardAddress1} ${data?.data.mateBoardAddress2} ${data?.data.mateBoardAddress3}`}</p>
            {/* Naver Map */}
            <div>
            {mapData.x !== 0 ?
              <MateDetailMap height='300px' mapData={mapData} zoomControl={true} />
            :
            <div>로딩 중입니다</div>
            }
            </div>
          </div>
          <div className={style.contentBottom}>
            <div>
              {/* <p>2023-04-17 15:24</p> */}
              {/* <p>{moment(data?.data.mateBoardRegistDate).format('YYYY-MM-DD HH:mm')}</p> */}
              <p>{`${data?.data.mateBoardRegistDate.split('T')[0]} ${data?.data.mateBoardRegistDate.split('T')[1].split(':')[0]}:${data?.data.mateBoardRegistDate.split('T')[1].split(':')[1]}`}</p>
              {data?.data.Users.account === userInfo[0].account &&
              <div>
                <button type='button' onClick={() => matePostUpdate(data?.data.mateBoardIndexNumber)}>수정</button>
                <button type='button' onClick={() => matePostDelete(data?.data.mateBoardIndexNumber)}>삭제</button>
              </div>
              }
            </div>
          </div>
        </div>
      </div>
      <div className={style.footer}>
        <button type='button'>연락하기</button>
      </div>
    </div>
    </>
  )
}
