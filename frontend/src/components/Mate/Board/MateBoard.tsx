import { useEffect, useState } from 'react';
import RegionData from './RegionData';
import KindData from './KindData';
import style from './MateBoard.module.css';
import mateSlideImage1 from '../../../assets/matepage/mateSlideImage_1.png';
import close from '../../../assets/icon/plus.png';
import MateBoardPost from './MateBoardPost';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useGetMateBoardListQuery } from '../../../hooks/queries/useGetMateBoardListQuery';
import { useParams } from 'react-router-dom';
import Controller from '../../../api/controller';

export default function MateBoard() {
  const [ showBoxRegion, setIsShowBoxRegion ] = useState<Boolean>(false);
  const [ showBoxKinds, setIsShowBoxKinds ] = useState<Boolean>(false);
  const [ boxRegion, setBoxRegion ] = useState<string>('서울');
  const [ regionDataList, setRegionDataList ] = useState<String[]>([]);
  const [ kindDataList, setKindDataList ] = useState<String[]>([]);
  const controller = new Controller();

  const isShowBoxRegionHandler = () => {
    setIsShowBoxRegion(!showBoxRegion);
  }
  const isShowBoxKindsHandler = () => {
    setIsShowBoxKinds(!showBoxKinds);
  }
 
  const regionChange = (region:string) => {
    setBoxRegion(region);
  }

  const regionAdd = (region:any, regionGu:string) => {
    const updateData = region + ' ' + regionGu;
    // console.log('regionDataList.includes(updateData) ', regionDataList.includes(updateData));
    if(regionDataList.includes(updateData)) {
      return ;
    }

    if(updateData.includes('전체')) {
      // xx 전체 항목 추가 시 xx xx구는 전부 삭제 되게 설정
      // console.log(updateData.indexOf('전체'));
      // console.log(updateData.slice(0, updateData.indexOf('전체')-1));
      const allFilterData = updateData.slice(0, updateData.indexOf('전체')-1);
      const lastUpdateData = regionDataList.filter((el) => !el.includes(allFilterData));
      // console.log('lastUpdateData ', lastUpdateData);
      lastUpdateData.push(updateData);
      setRegionDataList(lastUpdateData);
      return ;
    }

    if(regionDataList.includes(`${region} 전체`)){
      // xx 전체 항목이 있을 때 다른 xx xx구 추가 시 xx 전체 항목 삭제
      const allDeleteFilterData = regionDataList.filter((el) => !el.includes(`${region} 전체`));
      // console.log('allDeleteFilterData ', allDeleteFilterData);
      allDeleteFilterData.push(updateData);
      setRegionDataList(allDeleteFilterData);
      return ;
    }

    setRegionDataList([...regionDataList, updateData]);
    // console.log('regionDataList ', regionDataList);
    // console.log('regionDataList.includes() ', regionDataList.includes(updateData));
  }

  const boxRegionGu = RegionData.filter((el) => Object.keys(el)[0] === boxRegion)[0];

  const regionDelete = (regionGu:String):void => {
    const updateData = regionDataList.filter((el) => el !== regionGu);
    setRegionDataList(updateData);
  }

  const kindAdd = (addKind:String):void => {
    if(kindDataList.includes(addKind)) {
      // 이미 있는 항목 추가 시 함수 종료
      return ;
    }

    if(addKind === '전체') {
      // 전체 선택 시 전체만 체크, 나머지 삭제
      setKindDataList([addKind]);
      return ;
    }

    if(kindDataList.includes('전체')) {
      // 전체 선택 상태에서 다른 항목 선택 시 전체 항목만 삭제
      setKindDataList([addKind]);
      return ;
    }

    setKindDataList([...kindDataList, addKind]);
  }

  const kindDelete = (deleteKind:String):void => {
    const updateData = kindDataList.filter((el) => el !== deleteKind);
    setKindDataList(updateData);
  }

  const boxReset = ():void => {
    setIsShowBoxRegion(false);
    setIsShowBoxKinds(false);
    setRegionDataList([]);
    setKindDataList([]);
    // 구함 지원 체크 해제 추가 작업 필요
    // 금액 0원 초기화 작업 필요
  }

  const historyValue = useParams();
  const [ matePageNumber, setMatePageNumber ] = useState<string>('1');
  useEffect(():void => {
    const historyKeyword = historyValue.pageNumber;

    if(historyKeyword) setMatePageNumber(historyKeyword);

  }, [historyValue]);

  // React Query default
  // 임시 주석
  const { status, data, error } = useGetMateBoardList(matePageNumber);
  function useGetMateBoardList(matePageNumber:string) {
    return useQuery({
      queryKey: ['mateBoardList'],
      queryFn: async () => {
        const result = await controller.mateBoardList(matePageNumber);
        return result.data;
      }
    });
  }

  if (status === 'loading') return <div>'Loading...'</div>;
 
  if (error) return <div>'An error has occurred: ' + error</div>;

  // const status: "error" | "success" | "loading"

  // console.log('react query data ', data.data);
  // console.log('react query data ', typeof data.data);

  return (
    <div className={style.wrap}>
      <div className={style.slideWrap}>
        {/* 슬라이드 이미지는 일단 보류 */}
        <img src={mateSlideImage1} alt='mateSlideImage1' />
      </div>
      <div className={style.bodyWrap}>
        <h2>메이트</h2>
        <div className={style.boxWrap}>
          <div className={style.boxRegion}>
            <span>지역</span>
            <div onClick={isShowBoxRegionHandler}>
              {regionDataList.length === 0 ? <span>지역을 선택하세요</span> :
                <div className={style.boxRegionTextList}>
                  {regionDataList.map((el, index) => {
                    return (
                      <span key={index} onClick={(event:React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
                        // 상위 엘리먼트들로의 이벤트 전파를 중단
                        event.stopPropagation();
                        regionDelete(el);
                      }}>
                        {el}
                        <img src={close} alt='closeButton' />
                      </span>
                    )
                  })}
                </div>
              }
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
                    {!regionDataList.includes(Object.keys(boxRegionGu)[0] + ' ' + el) && <span onClick={() => regionAdd(Object.keys(boxRegionGu)[0], el)}>{el}</span>}
                    {regionDataList.includes(Object.keys(boxRegionGu)[0] + ' ' + el) && 
                    <span className={style.active} onClick={() => regionDelete(Object.keys(boxRegionGu)[0] + ' ' + el)}>
                      <svg fill="#000000" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="13px" height="13px" viewBox="0 0 305.002 305.002"
                        xmlSpace="preserve">
                        <g>
                          <path d="M152.502,0.001C68.412,0.001,0,68.412,0,152.501s68.412,152.5,152.502,152.5c84.089,0,152.5-68.411,152.5-152.5
                            S236.591,0.001,152.502,0.001z M152.502,280.001C82.197,280.001,25,222.806,25,152.501c0-70.304,57.197-127.5,127.502-127.5
                            c70.304,0,127.5,57.196,127.5,127.5C280.002,222.806,222.806,280.001,152.502,280.001z"/>
                          <path d="M218.473,93.97l-90.546,90.547l-41.398-41.398c-4.882-4.881-12.796-4.881-17.678,0c-4.881,4.882-4.881,12.796,0,17.678
                            l50.237,50.237c2.441,2.44,5.64,3.661,8.839,3.661c3.199,0,6.398-1.221,8.839-3.661l99.385-99.385
                            c4.881-4.882,4.881-12.796,0-17.678C231.269,89.089,223.354,89.089,218.473,93.97z"/>
                        </g>
                      </svg>
                      {el}</span>}
                  </div>
                )
              })}
            </div>
            <div className={style.innerBoxClose}>
              <img src={close} alt='closeButton' onClick={isShowBoxRegionHandler} />
            </div>
          </div>
          }
          <div className={style.boxKinds}>
            <span>종류</span>
            <div onClick={isShowBoxKindsHandler}>
              {kindDataList.length === 0 ? <span>종류를 선택하세요</span> :
              <div className={style.boxRegionTextList}>
              {kindDataList.map((el, index) => {
                return (
                  <span key={index} onClick={(event:React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
                    // 상위 엘리먼트들로의 이벤트 전파를 중단
                    event.stopPropagation();
                    kindDelete(el);
                  }}>
                    {el}
                    <img src={close} alt='closeButton' />
                  </span>
                )
              })}
            </div>
              }
            </div>
          </div>
          {showBoxKinds &&
          <div className={style.innerBoxWrap}>
            <div className={style.innerBoxRow}>
              {KindData.map((el, index) => {
                return (
                  <div className={style.innerBoxColKind} key={index}>
                    {!kindDataList.includes(el) && <span onClick={() => kindAdd(el)}>{el}</span>}
                    {kindDataList.includes(el) && 
                    <span className={style.active} onClick={() => kindDelete(el)}>
                      <svg fill="#000000" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="13px" height="13px" viewBox="0 0 305.002 305.002"
                        xmlSpace="preserve">
                        <g>
                          <path d="M152.502,0.001C68.412,0.001,0,68.412,0,152.501s68.412,152.5,152.502,152.5c84.089,0,152.5-68.411,152.5-152.5
                            S236.591,0.001,152.502,0.001z M152.502,280.001C82.197,280.001,25,222.806,25,152.501c0-70.304,57.197-127.5,127.502-127.5
                            c70.304,0,127.5,57.196,127.5,127.5C280.002,222.806,222.806,280.001,152.502,280.001z"/>
                          <path d="M218.473,93.97l-90.546,90.547l-41.398-41.398c-4.882-4.881-12.796-4.881-17.678,0c-4.881,4.882-4.881,12.796,0,17.678
                            l50.237,50.237c2.441,2.44,5.64,3.661,8.839,3.661c3.199,0,6.398-1.221,8.839-3.661l99.385-99.385
                            c4.881-4.882,4.881-12.796,0-17.678C231.269,89.089,223.354,89.089,218.473,93.97z"/>
                        </g>
                      </svg>
                      {el}</span>}
                  </div>
                )
              })}
            </div>
            <div className={style.innerBoxClose}>
              <img src={close} alt='closeButton' onClick={isShowBoxKindsHandler} />
            </div>
          </div>
          }
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
            <button type='button' onClick={boxReset}>초기화</button>
          </div>
        </div>
        <MateBoardPost postList={data.data} />
      </div>
    </div>
  )
}

