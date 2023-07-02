import { useState, useEffect, MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { UserType, userState } from '../../recoil/user';
import { mateBoardViewState, mateBoardViewType } from '../../recoil/mateBoardView';
import Controller from '../../api/controller';
import style from './MyWrite.module.css';
import { useAlert } from '../../hooks/useAlert';
import moment from 'moment';
import MyBoardPostButton from './MyBoardPostButton';

const tempData: any[] = [
  {
    id: 1,
    mateBoardCategory: '구함',
    mateBoardTitle: '제목을 작성합니다제목을 작성합니다제목을 작성합니다제목을 작성합니다제목을 작성합니다',
    mateBoardRegistDate: '2023-04-18 01:30',
  },
  {
    id: 2,
    mateBoardCategory: '지원',
    mateBoardTitle: '제목을 작성합니다',
    mateBoardRegistDate: '2023-04-18 01:30',
  },
  {
    id: 1,
    mateBoardCategory: '구함',
    mateBoardTitle: '제목을 작성합니다제목을 작성합니다제목을 작성합니다제목을 작성합니다제목을 작성합니다',
    mateBoardRegistDate: '2023-04-18 01:30',
  },
  {
    id: 2,
    mateBoardCategory: '지원',
    mateBoardTitle: '제목을 작성합니다',
    mateBoardRegistDate: '2023-04-18 01:30',
  },
  {
    id: 1,
    mateBoardCategory: '구함',
    mateBoardTitle: '제목을 작성합니다제목을 작성합니다제목을 작성합니다제목을 작성합니다제목을 작성합니다',
    mateBoardRegistDate: '2023-04-18 01:30',
  },
  {
    id: 2,
    mateBoardCategory: '지원',
    mateBoardTitle: '제목을 작성합니다',
    mateBoardRegistDate: '2023-04-18 01:30',
  },
  {
    id: 1,
    mateBoardCategory: '구함',
    mateBoardTitle: '제목을 작성합니다제목을 작성합니다제목을 작성합니다제목을 작성합니다제목을 작성합니다',
    mateBoardRegistDate: '2023-04-18 01:30',
  },
  {
    id: 2,
    mateBoardCategory: '지원',
    mateBoardTitle: '제목을 작성합니다',
    mateBoardRegistDate: '2023-04-18 01:30',
  },
  {
    id: 1,
    mateBoardCategory: '구함',
    mateBoardTitle: '제목을 작성합니다제목을 작성합니다제목을 작성합니다제목을 작성합니다제목을 작성합니다',
    mateBoardRegistDate: '2023-04-18 01:30',
  },
  {
    id: 2,
    mateBoardCategory: '지원',
    mateBoardTitle: '제목을 작성합니다',
    mateBoardRegistDate: '2023-04-18 01:30',
  },
];

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
  mateBoardLng: number;
  mateBoardLat: number;
}

export default function MyWrite() {
  const navigater = useNavigate();
  const userInfo = useRecoilValue<UserType[]>(userState);
  const [mateBoardView, setMateBoardView] = useRecoilState<mateBoardViewType>(mateBoardViewState);
  const { viewChange } = mateBoardView;
  const controller = new Controller();
  const { openAlert } = useAlert();
  const date = new Date();
  const compareDate = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
  const [ myMateBoardList, setMyMateBoardList ] = useState<MateBoardPostListInterface[]>([]);


  useEffect(() => {
    const getMyMateBoardPost = async () => {
      try {
        const result = await controller.myMateBoardPost(userInfo[0].account);
        console.log('getMyMateBoard ', result);
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
      // getMyMateBoardPost();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  const detailPostMoveHandler = (el:MateBoardPostListInterface):void => {
    console.log('el ', el);
    // navigater('/mate/detail/1');
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

      {/* {myMateBoardList?.length === 0 ?  */}
      {tempData?.length === 0 ? 
      <h2 className={style.zeroContent}>작성한 글이 없습니다.</h2>
      :
      <>
      <div className={style.header}>
        <p>번호</p>
        <p>카테고리</p>
        <p>제목</p>
        <p>날짜</p>
      </div>
      {/* {myMateBoardList.map((el:any, index:number) => { */}
      {tempData.map((el:MateBoardPostListInterface, index:number) => {
        return (
        <div className={style.body} key={index} onClick={() => detailPostMoveHandler(el)}>
          {/* <div className={style.body}> */}
            {/* <p>{el.mateBoardIndexNumber}</p> */}
            <p>{index+1}</p>
            <p>{el.mateBoardCategory === 1 ? '구함' : '지원'}</p>
            <p>{el.mateBoardTitle}</p>
            <p>{moment(el.mateBoardRegistDate).format('YYYY-MM-DD') === compareDate ? moment(el.mateBoardRegistDate).format('HH:mm')
            : moment(el.mateBoardRegistDate).format('YYYY-MM-DD')}</p>
        </div>
        )
      })}

      <div className={style.wrapBottom}>
        {/* 여기서도 offset으로 할지, 확인 후 설정하기 */}
        <MyBoardPostButton />
      </div>
      </>
      }
    </div>
  )
}
