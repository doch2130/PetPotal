import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import writeImage from '../../../assets/icon/pencil.png';
import AnimalCard from '../../UI/AnimalCard';
import style from './MateBoardPost.module.css';
import { useRecoilValue } from 'recoil';
import { UserType, userState } from '../../../recoil/user';
import { useConfirm } from '../../../hooks/useConfirm';
import Controller from '../../../api/controller';
import { useAlert } from '../../../hooks/useAlert';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useGetMateBoardListQuery } from '../../../hooks/queries/useGetMateBoardListQuery';
import MateBoardPostButton from './MateBoardPostButton';

interface MateBoardPostInterface extends MateBoardPageNumberInterface {
  postList: Array<MateBoardPostListInterface>;
}

interface MateBoardPostListInterface {
  mateBoardIndexNumber: number;
  mateBoardTitle: string;
  mateBoardFee: number;
  mateBoardContent: string;
  mateBoardContent2: string;
  mateBoardPhotos: string;
  mateBoardCategory: string;
  mateBoardRegistDate: string;
  mateBoardModifyDate: string;
  mateBoardStatus: number;
  animalsIndexNumber?: number;
  mateBoardAddress: string;
  mateBoardLng: number;
  mateBoardLat: number;
}

interface MateBoardPageNumberInterface {
  matePageNumber: string;
  setMatePageNumber: Function;
  postTotalCount: number;
}

export default function MateBoardPost(props:MateBoardPostInterface) {
  const { postList } = props;
  const navigater = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [userInfo, setUserInfo] = useRecoilState<UserType[]>(userState);
  const userInfo = useRecoilValue<UserType[]>(userState);
  const { openConfirm, closeConfirm } = useConfirm();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ tempData, setTempData ] = useState<string[]>([
    'test1', 'test2', 'test3', 'test4', 'test5', 'test6', 'test7', 'test8'
  ]);
  const controller = new Controller();
  const [ likeBoardList, setLikeBoardList ] = useState();
  const { openAlert } = useAlert();
  const [ viewChange, setViewChange ] = useState<Boolean>(true);
  const [ timeSort, setTimeSort ] = useState<string>('newest');

  const itemsPerPage = 9;
  const startIndex = (Number(props.matePageNumber) - 1) * itemsPerPage;
  const endIndex = Number(props.matePageNumber) * itemsPerPage;



  const detailPostMoveHandler = () => {
    navigater('/mate/detail/1');
  }

  const mateBoardWriteMove = () => {
    if(userInfo[0].account !== '') {
      navigater('/mate/write');
      return ;
    }
    
    openConfirm({
      title: '로그인필요',
      content: '로그인 이후 작성 가능합니다.\r\n로그인 페이지로 이동하시겠습니까?',
      callback: () => {
        navigater('/login');
        closeConfirm();
        return ;
      }
    });
  }

  const viewChangeFunction = ():void => {
    setViewChange(!viewChange);
    return ;
  }

  const timeSortChangeFunction = (e:any):void => {
    // console.log('e.target.value ', e.target.value);
    setTimeSort(e.target.value);
    return ;
  }

  useEffect(() => {
    const getMateLikeBoardList = async () => {
      const result = await controller.mateLikeBoardList(userInfo[0].account);
      if(result.data !== 200) {
        openAlert({
          title: 'getMateLikeBoardList Error',
          type: 'error',
          content: '에러가 발생하였습니다. 새로고침 후 다시 이용해주세요',
        })
        return ;
      }
      setLikeBoardList(result.data);
    }

    if(userInfo[0].account !== '') {
      // 일단 주석처리
      // 개인 좋아요 메이트 리스트 가져오기
      // getMateLikeBoardList();
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo[0].account]);

  console.log(postList);
  console.log(postList.slice(-endIndex,));
  console.log('endIndex ', endIndex);
  console.log('-endIndex ', -endIndex);
  console.log('startIndex ', startIndex);
  console.log('-startIndex ', -startIndex);
  console.log('postList.slice(-endIndex, -startIndex) ', postList.slice(-endIndex, -startIndex));
  console.log('postList.slice(-endIndex) ', postList.slice(-endIndex));
  console.log('postList.slice(-postList.length, startIndex) ', postList.slice(-postList.length, endIndex));

  return (
    <div className={style.wrap}>
      <div className={style.header}>
        {/* <p>55개 게시글</p> */}
        <p>{postList.length}개 게시글</p>
        <div className={style.headerSort}>
          <p>정렬</p>
          <select onChange={timeSortChangeFunction}>
            <option value='newest'>최신순</option>
            <option value='oldest'>오래된 순</option>
          </select>
        </div>
      </div>
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
      <div className={style.body}>
        {timeSort === 'newest' &&
          // postList.map((el:MateBoardPostListInterface, index:number) => {
            postList.slice(startIndex, endIndex).map((el: MateBoardPostListInterface) => {
            return (
              <div className={style.AnimalCardWrap} key={el.mateBoardIndexNumber}>
                <AnimalCard detailPostMoveHandler={detailPostMoveHandler} userId={userInfo[0].account} postData={el} />
              </div>
              );
            })
        }
        {timeSort === 'oldest' &&
          // postList.map((el:MateBoardPostListInterface, index:number) => {
          postList.slice(-endIndex, -startIndex).map((el: MateBoardPostListInterface, index:number) => {
            return (
              <div className={style.AnimalCardWrap} key={el.mateBoardIndexNumber}>
                <AnimalCard detailPostMoveHandler={detailPostMoveHandler} userId={userInfo[0].account} postData={el} />
              </div>
            );
          // const reverseIndex = postList.length - index - 1;
          // const reverseElement = postList[reverseIndex];
          // return (
          //   <div className={style.AnimalCardWrap} key={reverseElement.mateBoardIndexNumber}>
          //     <AnimalCard detailPostMoveHandler={detailPostMoveHandler} userId={userInfo[0].account} postData={reverseElement} />
          //   </div>
          //   );
          })
        }
      </div>
      <div className={style.bottom}>
        <div></div>
        <div className={style.bottomPageButton}>
          <MateBoardPostButton postLength={postList.length} matePageNumber={props.matePageNumber} setMatePageNumber={props.setMatePageNumber} postTotalCount={props.postTotalCount}/>
        </div>
        <div className={style.bottomWriteButton}>
          <button type='button' onClick={mateBoardWriteMove}><img src={writeImage} alt='writeImage' />
            글쓰기
          </button>
        </div>
      </div>
    </div>
  )
}
