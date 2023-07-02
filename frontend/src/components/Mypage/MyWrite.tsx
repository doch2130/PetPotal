import { useState, useEffect, MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { UserType, userState } from '../../recoil/user';
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
  

  return (
    <div className={style.wrap}>
      {/* <div className={style.wrapTop}> */}
      {/* {tempData?.length > 0 && <button type='button' className={style.viewTypeChangeButton}>변경</button>} */}
      {/* </div> */}

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
