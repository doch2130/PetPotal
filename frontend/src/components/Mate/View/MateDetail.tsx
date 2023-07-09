import { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { UserType, userState } from '../../../recoil/user';
import { useModal } from '../../../hooks/useModal';
import { Params, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useConfirm } from '../../../hooks/useConfirm';
import { useAlert } from '../../../hooks/useAlert';
import Controller from '../../../api/controller';
import PictureBox from '../../UI/PictureBox';
import MateDetailMap from './MateDetailMap';
import mateDefaultImage from '../../../assets/matepage/MateDefaultImage.png';
import style from './MateDetail.module.css';

// import emptyHeart from '../../../assets/icon/empty_heart.png';
// import share from '../../../assets/icon/share.png';
// import star from '../../../assets/icon/star.png';
// import interest from '../../../assets/icon/people.png';
// import chatting from '../../../assets/icon/chatting.png';
// import locationMap from '../../../assets/icon/location_map.png';

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
      size: 'lg',
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
    // console.log('historyValue.matePostNumber ', historyValue.matePostNumber);
    // console.log('historyValue.pageNumber ', historyValue.pageNumber);
    // const historyKeyword = Number(historyValue.matePostNumber);
    // matePostNumber = pageNumber, index.tsx route 설정으로 인한 변수이름
    const historyKeyword = Number(historyValue.pageNumber);
    if(historyKeyword) {
      setMatePostDetailNumber(historyKeyword);
    }
    return ;
  }, [historyValue]);

  // React Query default
  const fetchMateBoardDetail = async (matePostDetailNumber:string) => {
    try {
      const result = await controller.mateBoardDetailPost(matePostDetailNumber, userInfo[0].account);
      return result.data;
    } catch (err:any) {
      if(err.response.data.responseCode === 404) {
        openAlert({
          type: 'error',
          content: '존재하지 않는 페이지입니다.',
        });
        navigater('/mate/board/1');
        return ;
      }
      openAlert({
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if(status === 'loading') return <div className={style.reactQueryLoading}>Data Loading...</div>

  if(error) return <div className={style.reactQueryError}>Data Load Error</div>

  const matePostDelete = async (mateBoardIndexNumber:number):Promise<void> => {
    openConfirm({
      content: '해당 글을 삭제하시겠습니까?',
      callback: async () => {
        try {
          // const result = await controller.mateBoardDeletePost(mateBoardIndexNumber);
          await controller.mateBoardDeletePost(mateBoardIndexNumber);
          closeConfirm();
          openAlert({
            type: 'success',
            content: '해당 글이 삭제되었습니다.',
          });
          navigater('/mate/board/1');
          return ;
        } catch (err:any) {
          closeConfirm();
          openAlert({
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
      content: '해당 글을 수정하시겠습니까?',
      callback: () => {
        closeConfirm();
        navigater(`/mate/update/${mateBoardIndexNumber}`);
      }
    });
    return ;
  }

  const matePostContact = ():void => {
    openAlert({
      type: 'error',
      content: '준비 중인 기능입니다.',
    });
    return ;
  }

  return (
    <>
    <div className={style.wrap}>
      <div className={style.top}>
        {/* 기능 준비 중 */}
        {/* <img src={emptyHeart} alt='emptyHeart' /> */}
        {/* <img src={share} alt='share' /> */}
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
          <h2>{data?.data.Animals?.animalsName}</h2>
          <div className={style.genderAge}>
            {data?.data.Animals && <p>{data?.data.Animals?.animalsGender === 1 ? '수컷' : '암컷'}</p>}
            {data?.data.Animals && <p>{data?.data.Animals?.animalsAge}세</p>}
          </div>
          <div className={style.breed}>
            <p>{data?.data.Animals?.animalsCategory2}</p>
          </div>
          {/* 서비스 준비중 */}
          {/* <div className={style.grade}>
            <img src={star} alt='star' />
            <p>4.6 (123)</p>
          </div> */}
          {/* 서비스 준비중 */}
          {/* <div className={style.interest}>
            <img src={interest} alt='interest' />
            <p>97명</p>
            <p>이 이 글에 관심을 가지고 있어요!</p>
          </div> */}
          {/* 채팅, 위치 버튼 - 미사용으로 주석처리 */}
          {/* <div className={style.buttonGroup}>
            <div>
              <img src={chatting} alt='chatting' />
              <span>연락하기</span>
            </div>
            <div onClick={modalMapOpen}>
              <img src={locationMap} alt='locationMap' />
              <span>위치보기</span>
            </div>
          </div> */}
          {/* 내용 2 */}
          <div className={style.title}>
            <p>제목</p>
            <p>{data?.data.mateBoardTitle}</p>
          </div>
          <div className={style.content1}>
            <p>세부내용</p>
            <pre dangerouslySetInnerHTML={{__html: data?.data.mateBoardContent1}}>
            </pre>
          </div>
          <div className={style.content2}>
            <p>*주의사항</p>
            <pre dangerouslySetInnerHTML={{__html: data?.data.mateBoardContent2}}>
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
        <button type='button' onClick={matePostContact}>연락하기</button>
      </div>
    </div>
    </>
  )
}
