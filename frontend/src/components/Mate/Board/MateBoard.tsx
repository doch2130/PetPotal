import style from './MateBoard.module.css';
import mateSlideImage1 from '../../../assets/matepage/mateSlideImage_1.png';
import { useEffect, useRef, useState } from 'react';
import RegionData from './RegionData';
import close from '../../../assets/icon/plus.png';

export default function MateBoard() {
  const [ showBoxRegion, setShowBoxRegion ] = useState<Boolean>(false);
  const [ showBoxKinds, setShowBoxKinds ] = useState<Boolean>(false);
  const [ boxRegion, setBoxRegion ] = useState<string>('서울');
  const [ regionData, setRegionData ] = useState<String[]>([]);

  const showBoxRegionHandler = () => {
    setShowBoxRegion(!showBoxRegion);
  }
  const showBoxKindsHandler = () => {
    setShowBoxKinds(!showBoxKinds);
  }

  const regionChange = (region:string) => {
    setBoxRegion(region);
  }

  const regionAdd = (region:any, regionGu:string) => {
    const updateData = region + ' ' + regionGu;
    setRegionData([...regionData, updateData]);
  }

  const boxRegionGu = RegionData.filter((el) => Object.keys(el)[0] === boxRegion)[0];

  const regionDelete = (regionGu:String) => {
    const updateData = regionData.filter((el) => el !== regionGu);
    setRegionData(updateData);
  }

  return (
    <div className={style.wrap}>
      <div className={style.slideWrap}>
        <img src={mateSlideImage1} alt='mateSlideImage1' />
      </div>
      <div className={style.bodyWrap}>
        <h2>메이트</h2>
        <div className={style.boxWrap}>
          <div className={style.boxRegion}>
            <span>지역</span>
            <div onClick={showBoxRegionHandler}>
              {regionData.length === 0 && <span>지역을 선택하세요</span>}

              <div>
                {regionData.map((el, index) => {
                  return (
                    <span key={index} onClick={(event:React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
                      // 상위 엘리먼트들로의 이벤트 전파를 중단
                      event.stopPropagation();
                      regionDelete(el);
                    }}>{el}</span>
                  )
                })}
              </div>
            </div>
          </div>
          {showBoxRegion && 
          <div className={style.innerBoxWrap}>
            <div className={style.innerBoxRow}>
              {RegionData.map((el) => {
                return (
                  <div className={
                    Object.keys(el)[0] === boxRegion ? style.innerBoxCol + ' ' + style.active : style.innerBoxCol
                    } key={Object.keys(el)[0]}
                    onClick={() => regionChange(Object.keys(el)[0])} >
                    <span>{Object.keys(el)[0]}</span>
                  </div>
                )
              })}
            </div>
            <div className={style.innerBoxRow}>
              {boxRegionGu[Object.keys(boxRegionGu)[0]].map((el, index) => {
                return (
                  <div className={style.innerBoxColGu} key={index}>
                    <span onClick={() => regionAdd(Object.keys(boxRegionGu)[0], el)}>{el}</span>
                  </div>
                )
              })}
            </div>
            <div className={style.innerBoxClose}>
              <img src={close} alt='closeButton' onClick={showBoxRegionHandler} />
            </div>
          </div>
          }
          <div className={style.boxKinds}>
            <span>종류</span>
            <div onClick={showBoxKindsHandler}>
              <span>종류를 선택하세요</span>
            </div>
          </div>
          <div className={style.boxCategory}>
            <span>구분</span>
            <div>
              <input type='checkbox' value='구함' id='boxCategoryWanted' />
              <label htmlFor='boxCategoryWanted'>구함</label>
              <input type='checkbox' value='지원' id='boxCategorySupport' />
              <label htmlFor='boxCategorySupport'>지원</label>
            </div>
          </div>
          <div className={style.boxAmount}>
            <span>금액</span>
            <div>
              <input type='number' placeholder='0' min='0' />
              <span>원 이상</span>
            </div>
          </div>
          <div className={style.boxButtonGroup}>
            <button type='button'>검색</button>
            <button type='button'>초기화</button>
          </div>
        </div>
      </div>
    </div>
  )
}

