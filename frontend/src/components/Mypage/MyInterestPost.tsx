import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { UserType, userState } from '../../recoil/user';
import { mateBoardViewState, mateBoardViewType } from '../../recoil/mateBoardView';
import { useAlert } from '../../hooks/useAlert';
import Controller from '../../api/controller';
import MyBoardPostButton from './MyBoardPostButton';
import MyBoardNotPage from './MyBoardNotPage';
import AnimalCard from '../UI/AnimalCard';
import style from './MyWrite.module.css';

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

export default function MyInterestPost() {
  const navigater = useNavigate();
  const historyValue = useParams();
  const controller = new Controller();
  const userInfo = useRecoilValue<UserType[]>(userState);
  const [mateBoardView, setMateBoardView] = useRecoilState<mateBoardViewType>(mateBoardViewState);
  const { viewChange } = mateBoardView;
  const { openAlert } = useAlert();
  const [ myMateInterestBoardList, setMyMateInterestBoardList ] = useState<MateBoardPostListInterface[]>([]);
  const [ printmyMateInterestBoardList, setPrintmyMateInterestBoardList ] = useState<MateBoardPostListInterface[]>([]);
  const [ postPageNumber, setPostPageNumber ] = useState<string>('1');
  const [ totalPostCount, setTotalPostCount ] = useState<number>(0);
  const date = new Date();
  const compareDate = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
  

  useEffect(():void => {
    const historyKeyword = historyValue.page;
    const historyPostKeyword = historyValue.postNumber;

    if(historyKeyword === 'interest' && historyPostKeyword === undefined) {
      navigater('/mypage/interest/1');
      return ;
    }

    if(historyKeyword === 'interest' && historyPostKeyword) {
      setPostPageNumber(historyPostKeyword);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [historyValue]);

  useEffect(():void => {
    const getMyMateBoardPost = async () => {
      try {
        const result = await controller.myMatePostInterest();
        // console.log('getMyMateBoard ', result);
        // const reverse = [...result.data.data.rows].reverse();
        // setMyMateInterestBoardList(reverse);
        setMyMateInterestBoardList(result.data.data.rows);
        setTotalPostCount(result.data.data.count);
        return ;
      } catch (err:any) {
        openAlert({
          title: '나의 글 로딩 에러',
          type: 'error',
          content: '데이터 로딩 중 에러가 발생하였습니다.\r\n새로고침 후 다시 시도해주세요.',
        });
        return ;
      }
    }
    if(userInfo[0].account !== '') {
      getMyMateBoardPost();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  const detailPostMoveHandler = (el:MateBoardPostListInterface):void => {
    navigater(`/mate/detail/${el.mateBoardIndexNumber}`);
    return ;
  }

  const viewChangeFunction = ():void => {
    setMateBoardView((prevMateBoardView) => ({
      ...prevMateBoardView,
      viewChange: !prevMateBoardView.viewChange
    }));
    return ;
  }

  useEffect(():void => {
    // console.log('myMateInterestBoardList ', myMateInterestBoardList);
    // console.log('totalPostCount ', totalPostCount);
    // console.log('postPageNumber ', postPageNumber);
    if(myMateInterestBoardList.length > 0) {
      // setPrintmyMateInterestBoardList(myMateInterestBoardList?.slice((Number(postPageNumber)-1)*9, 9*Number(postPageNumber)));
      setPrintmyMateInterestBoardList(myMateInterestBoardList?.slice((Number(postPageNumber)-1)*8, 8*Number(postPageNumber)));
    }
  }, [myMateInterestBoardList, postPageNumber]);

  return (
    <div className={style.wrap}>
      <div className={style.viewChange}>
        <span>보기</span>
        {viewChange ? 
          <svg width="21" height="21" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-labelledby="appsAltIconTitle" onClick={viewChangeFunction}>
            <rect x="5" y="5" width="2" height="2"/>
            <rect x="11" y="5" width="2" height="2"/>
            <rect x="17" y="5" width="2" height="2"/>
            <rect x="5" y="11" width="2" height="2"/>
            <rect x="11" y="11" width="2" height="2"/>
            <rect x="17" y="11" width="2" height="2"/>
            <rect x="5" y="17" width="2" height="2"/>
            <rect x="11" y="17" width="2" height="2"/>
            <rect x="17" y="17" width="2" height="2"/>
          </svg>
          :
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="21" height="21" onClick={viewChangeFunction}>
            <path d="M8.75 5.5h11.5a.75.75 0 0 1 0 1.5H8.75a.75.75 0 0 1 0-1.5Zm0 6h11.5a.75.75 0 0 1 0 1.5H8.75a.75.75 0 0 1 0-1.5Zm0 6h11.5a.75.75 0 0 1 0 1.5H8.75a.75.75 0 0 1 0-1.5ZM5 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM4 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0 12a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path>
          </svg>
        }
      </div>

      {myMateInterestBoardList?.length === 0 && postPageNumber !== '1' ?
      <MyBoardNotPage url={'/mypage/interest/1'} /> :
      myMateInterestBoardList?.length === 0 && postPageNumber === '1' ? 
      <h2 className={style.zeroContent}>관심 글이 없습니다.</h2>
      :
      viewChange ?
      <>
      <div className={style.bodyAniamlCard}>
        {printmyMateInterestBoardList.map((el:MateBoardPostListInterface) => {
          return (
            <div className={style.AnimalCardWrap} key={el.mateBoardIndexNumber}>
              <AnimalCard detailPostMoveHandler={() => detailPostMoveHandler(el)} userId={userInfo[0].account} postData={el}
              myMateInterestBoardList={myMateInterestBoardList} setMyMateInterestBoardList={setMyMateInterestBoardList}
               />
            </div>
          )
        })}
      </div>
      
      <div className={style.wrapBottom}>
        {totalPostCount > 0 && <MyBoardPostButton postPageNumber={postPageNumber} setPostPageNumber={setPostPageNumber}
        totalPostCount={totalPostCount} pageUrl={'/mypage/interest'} />}
      </div>
      </>
      :
      <>
      <div className={style.header}>
        <p>번호</p>
        <p>카테고리</p>
        <p>제목</p>
        <p>날짜</p>
      </div>
      {printmyMateInterestBoardList.map((el:MateBoardPostListInterface) => {
        return (
        <div className={style.body} key={el.mateBoardIndexNumber} onClick={() => detailPostMoveHandler(el)}>
            <p>{el.mateBoardIndexNumber}</p>
            <p>{el.mateBoardCategory === 1 ? '구함' : '지원'}</p>
            <p>{el.mateBoardTitle}</p>
            <p>{ el.mateBoardRegistDate.split('T')[0] === compareDate ?
            `${el.mateBoardRegistDate.split('T')[1].split(':')[0]}:${el.mateBoardRegistDate.split('T')[1].split(':')[1]}`
            : el.mateBoardRegistDate.split('T')[0] }</p>
        </div>
        )
      })}

      <div className={style.wrapBottom}>
        {totalPostCount > 0 && <MyBoardPostButton postPageNumber={postPageNumber} setPostPageNumber={setPostPageNumber}
        totalPostCount={totalPostCount} pageUrl={'/mypage/interest'} />}
      </div>
      </>
      }
    </div>
  )
}
