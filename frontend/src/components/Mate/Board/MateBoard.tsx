import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { UserType, userState } from '../../../recoil/user';
import { useQuery, useQueryClient } from '@tanstack/react-query';
// import { useGetMateBoardListQuery } from '../../../hooks/queries/useGetMateBoardListQuery';
import Controller from '../../../api/controller';
import RegionData from './RegionData';
import KindData from './KindData';
import MateBoardSlideImage from './MateBoardSlideImage';
import MateBoardPost from './MateBoardPost';
import MateBoardNotPage from './MateBoardNotPage';
import close from '../../../assets/icon/plus.png';
import style from './MateBoard.module.css';
import { useAlert } from '../../../hooks/useAlert';

interface searchQueryInterface {
  searchRegion: string;
  searchKind: string;
  searchType: string;
  searchAmount: number;
}

export default function MateBoard() {
  const userInfo = useRecoilValue<UserType[]>(userState);
  const [ showBoxRegion, setIsShowBoxRegion ] = useState<Boolean>(false);
  const [ showBoxKinds, setIsShowBoxKinds ] = useState<Boolean>(false);
  const [ boxRegion, setBoxRegion ] = useState<string>('서울');
  const [ regionDataList, setRegionDataList ] = useState<String[]>([]);
  const [ kindDataList, setKindDataList ] = useState<String[]>([]);
  const [ boxPostType, setBoxPostType ] = useState<String[]>([]);
  const controller = new Controller();
  const boxPostAmount = useRef<HTMLInputElement>(null);
  const [ searchQuery, setSearchQuery] = useState<searchQueryInterface>({
    searchRegion: '',
    searchKind: '',
    searchType: '',
    searchAmount: 0,
  });

  const [ postTotalCount, setPostTotalCount ] = useState<number>(0);
  const [ timeSort, setTimeSort ] = useState<string>('newest');
  const { openAlert } = useAlert();

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
    setBoxPostType([]);
    if (boxPostAmount.current) {
      boxPostAmount.current.value = '0';
    }
    setSearchQuery({
      searchRegion: '',
      searchKind: '',
      searchType: '',
      searchAmount: 0,
    });
  }

  const historyValue = useParams();
  const [ matePageNumber, setMatePageNumber ] = useState<string>('1');
  useEffect(():void => {
    const historyKeyword = historyValue.pageNumber;

    if(historyKeyword) setMatePageNumber(historyKeyword);

  }, [historyValue]);


  // React Query default
  // useQuery({queryKey: '', queryFn: ()}) React Query V3 이전 방식
  // const { status, data, error } = useGetMateBoardList(matePageNumber);
  // function useGetMateBoardList(matePageNumber:string) {
  //   return useQuery({
  //     queryKey: [`mateBoardList/${matePageNumber}/${timeSort}`, searchQuery],
  //     queryFn: async () => {
  //       const result = await controller.mateBoardList(matePageNumber, searchQuery, userInfo[0].account, timeSort);
  //       // console.log('result ', result);
  //       // console.log('result ', result.data.data.rows);
  //       setPostTotalCount(result.data.data.count);
  //       // return result.data;
  //       return result.data.data;
  //     }
  //   });
  // }

  const fetchMateBoardList = async () => {
    try {
      const result = await controller.mateBoardList(matePageNumber, searchQuery, userInfo[0].account, timeSort);
      setPostTotalCount(result.data.data.count);
      return result.data.data;
    } catch (err:any) {
      console.log(err);
      if(err.response.status === 304) {
        return err.data.data;
      }
      openAlert({
        title: '게시글 데이터 로딩 Error',
        type: 'error',
        content: '데이터 로딩 중 문제가 발생하였습니다.\r\n새로고침 후 이용해주세요.',
      });
      return ;
    }
  }
  // useQuery(key값, ()) Reacy Query V3 이후 방식
  const { status, data, error } = useQuery([`mateBoardList/${matePageNumber}/${timeSort}`, searchQuery], () => fetchMateBoardList());

  if (status === 'loading') return <div className={style.reactQueryLoading}>Data Loading...</div>;
 
  if (error) return <div className={style.reactQueryError}>Data Load Error</div>;

  const postTypeChangeFunction = (e:React.ChangeEvent<HTMLInputElement>):void => {
    // console.log(e.target.value);
    // console.log(e.target.checked);

    if(e.target.checked) {
      setBoxPostType([...boxPostType, e.target.value]);
    } else {
      // postType
      setBoxPostType(boxPostType.filter(el => el !== e.target.value));
    }
    return ;
  }

  const boxSearch = ():void => {
    const boxPostAmountValue = Number(boxPostAmount.current?.value);
    let boxPostTypeValue = '';
    if(boxPostType.length === 1 ) {
      boxPostTypeValue = boxPostType[0].toString();
    }
    
    setSearchQuery({
      searchRegion: regionDataList.toString(),
      searchKind: kindDataList.toString(),
      searchType: boxPostTypeValue,
      searchAmount: boxPostAmountValue,
    })
    return ;
  }

  return (
    <div className={style.wrap}>
      <div className={style.slideWrap}>
        {/* 슬라이드 이미지는 일단 보류 */}
        <MateBoardSlideImage />
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
                    {!kindDataList.includes(el) && <span onClick={():void => kindAdd(el)}>{el}</span>}
                    {kindDataList.includes(el) && 
                    <span className={style.active} onClick={():void => kindDelete(el)}>
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
              <input type='checkbox' value='구함' id='boxCategoryWanted' onChange={postTypeChangeFunction} />
              <label htmlFor='boxCategoryWanted'>구함</label>
              <input type='checkbox' value='지원' id='boxCategorySupport' onChange={postTypeChangeFunction} />
              <label htmlFor='boxCategorySupport'>지원</label>
            </div>
          </div>
          <div className={style.boxAmount}>
            <span>금액</span>
            <div>
              <input ref={boxPostAmount} type='number' placeholder='0' min='0' defaultValue='0' />
              <span>원 이상</span>
            </div>
          </div>
          <div className={style.boxButtonGroup}>
            <button type='button' onClick={boxSearch}>검색</button>
            <button type='button' onClick={boxReset}>초기화</button>
          </div>
        </div>
        {/* <MateBoardPost postList={data.data} matePageNumber={matePageNumber} setMatePageNumber={setMatePageNumber} postTotalCount={postTotalCount} /> */}
        
        {data.rows.length === 0 && matePageNumber !== '1' ? 
        <MateBoardNotPage /> : 
        <MateBoardPost postList={data.rows} matePageNumber={matePageNumber}
        setMatePageNumber={setMatePageNumber} postTotalCount={postTotalCount}
        timeSort={timeSort} setTimeSort={setTimeSort} />
      }
      </div>
    </div>
  )
}

