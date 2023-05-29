import style from './MateDetail.module.css';
import emptyHeart from '../../../assets/icon/empty_heart.png';
import share from '../../../assets/icon/share.png';
import star from '../../../assets/icon/star.png';
import interest from '../../../assets/icon/people.png';
import chatting from '../../../assets/icon/chatting.png';
import locationMap from '../../../assets/icon/location_map.png';
import PictureBox from '../../UI/PictureBox';
import { useCallback, useEffect, useRef, useState } from 'react';
import MateViewMap from './MateViewMap';
import { useRecoilState } from 'recoil';
import { UserType, userState } from '../../../recoil/user';
import Controller from '../../../api/controller';

const tempData = [
  '/static/media/default.0cb1e01d076d6e0fd830.png',
  '/static/media/default.0cb1e01d076d6e0fd830.png',
]

interface mapData {
  x: number;
  y: number;
  _lng: number;
  _lat: number;
}

export default function MateDetail(props:any) {
  const { imgFile, setImgFile } = props;
  const [mouseDownClientX, setMouseDownClientX] = useState(0);
  const [mouseDownClientY, setMouseDownClientY] = useState(0);
  const [mouseUpClientX, setMouseUpClientX] = useState(0);
  const [mouseUpClientY, setMouseUpClientY] = useState(0);
  const controller = new Controller();
  const [ userInfo, setUserInfo ] = useRecoilState<UserType[]>(userState);
  const [ mapData, setMapData ] = useState<mapData>({
    x: 0,
    y: 0,
    _lng: 0,
    _lat: 0,
  });

  // const [imgFile, setImgFile] = useState<File[]>([]);
  // const [imgUrl, setImgUrl] = useState<string[]>([]);
  const [imgUrl, setImgUrl] = useState<string[]>([
    '/static/media/MainPage_Dog.1d0a30c4b1704ee37ebf.png',
    '/static/media/MainPage_Cat.9fed3dbb00482ebb7bdf.png',
  ]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const slideRef = useRef<any>([]);

  const onMouseDown = useCallback((e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setMouseDownClientX(e.clientX);
    setMouseDownClientY(e.clientY);
  }, []);

  const onMouseUp = useCallback((e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setMouseUpClientX(e.clientX);
    setMouseUpClientY(e.clientY);
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
  };

  useEffect(() => {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mouseUpClientX]);

  useEffect(() => {
    const mapGeocoding = async () => {
      const address = (userInfo[0].address1 + ' ' + userInfo[0].address2 + ' ' + userInfo[0].address3 + ' ' + userInfo[0].address4).trim();
      // console.log('address ', address);
      if (address !== '') {
        const result = await controller.naverMapTest(address);
        // console.log('result ', result.data);
        // console.log('result ', result.data[0]);
        // console.log('result ', result.data[1]);
        setMapData({
          x: result.data[0],
          y: result.data[1],
          _lng: result.data[0],
          _lat: result.data[1],
        });
      }
    }

    mapGeocoding();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  return (
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
          <h2>나비</h2>
          <div className={style.genderAge}>
            <p>암컷</p>
            <p>11세</p>
          </div>
          <div className={style.breed}>
            <p>트레디셔널 페르시안</p>
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
            <div>
              <img src={locationMap} alt='locationMap' />
              <span>위치보기</span>
            </div>
          </div>
          {/* 내용 2 */}
          <div className={style.title}>
            <p>제목</p>
            <p>강아지 제목입니다.</p>
          </div>
          <div className={style.content1}>
            <p>세부내용</p>
            <pre>
              <p>날짜 : 202-04-15 토요일</p>
              <p>시간 : 16시 ~ 17시</p>
              <p>급여 : 10,000원</p>
              <p> </p>
              <p>주요 내용 :</p>
              <p>1시간 동안 공원에서 산책 시켜주시면 됩니다.</p>
            </pre>
          </div>
          <div className={style.content2}>
            <p>*주의사항</p>
            <pre>
              <p>공격성이 어느 정도 있는 고양이 입니다. 그래서 초보자 분은 하기 힘드실 수 있습니다.</p>
              <p>그리고 심장이 안좋아서 약을 먹고 있습니다.</p>
            </pre>
          </div>
          <div className={style.locationMap}>
            <p>상세 위치 안내</p>
            {/* Naver Map */}
            <div>
            {mapData.x !== 0 ?
              <MateViewMap height='300px' mapData={mapData} />
            :
            <div>로딩 중입니다</div>
            }
            </div>
          </div>
          <div className={style.contentBottom}>
            <div>
              <p>2023-04-17 15:24</p>
              <div>
                <button type='button'>수정</button>
                <button type='button'>삭제</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.footer}>
        <button type='button'>연락하기</button>
      </div>
    </div>
  )
}
