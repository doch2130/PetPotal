import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { UserType, userState } from '../../../recoil/user';
import { mateBoardViewState, mateBoardViewType } from '../../../recoil/mateBoardView';
import { useConfirm } from '../../../hooks/useConfirm';
import { useAlert } from '../../../hooks/useAlert';
import Controller from '../../../api/controller';
import AnimalCard from '../../UI/AnimalCard';
import MateBoardPostTable from './MateBoardPostTable';
import MateBoardPostButton from './MateBoardPostButton';
import writeImage from '../../../assets/icon/pencil.png';
import style from './MateBoardPost.module.css';

interface MateBoardPostInterface extends MateBoardPageNumberInterface {
  postList: Array<MateBoardPostListInterface>;
  timeSort: string;
  setTimeSort: Function;
}

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
}

interface MateBoardPageNumberInterface {
  matePageNumber: string;
  setMatePageNumber: Function;
  postTotalCount: number;
}

export default function MateBoardPost(props:MateBoardPostInterface) {
  const { postList, timeSort, setTimeSort, matePageNumber } = props;
  const userInfo = useRecoilValue<UserType[]>(userState);
  const navigater = useNavigate();
  const [mateBoardView, setMateBoardView] = useRecoilState<mateBoardViewType>(mateBoardViewState);
  const { viewChange } = mateBoardView;
  // const [ viewChange, setViewChange ] = useState<Boolean>(true);
  const { openConfirm, closeConfirm } = useConfirm();
  const controller = new Controller();
  const { openAlert } = useAlert();

  const itemsPerPage = 9;
  const startIndex = (Number(matePageNumber) - 1) * itemsPerPage;
  const endIndex = Number(matePageNumber) * itemsPerPage;

  // const detailPostMoveHandler = (mateBoardIndexNumber:number):void => {
  const detailPostMoveHandler = (el:MateBoardPostListInterface):void => {
    // navigater('/mate/detail/1');
    navigater(`/mate/detail/${el.mateBoardIndexNumber}`);
    return ;
  }

  const mateBoardWriteMove = ():void => {
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
    return ;
  }

  const viewChangeFunction = ():void => {
    setMateBoardView((prevMateBoardView) => ({
      ...prevMateBoardView,
      viewChange: !prevMateBoardView.viewChange
    }));
    return ;
  }

  const timeSortChangeFunction = (e:any):void => {
    // console.log('e.target.value ', e.target.value);

    // 정렬에 따라서 데이터 호출을 다시 해야할 듯
    // offset으로 데이터를 가져오기 때문에 전체 데이터에 대한 정렬이 아니라서 1페이지 기준으로만 변경이 된다.

    setTimeSort(e.target.value);
    return ;
  }

  return (
    <div className={style.wrap}>
      <div className={style.header}>
        {/* <p>55개 게시글</p> */}
        {/* <p>{postList.length}개 게시글</p> */}
        <p>{props.postTotalCount}개 게시글</p>
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
        {postList.length === 0 && 
        <div className={style.noneAnimalCard}>
          <h1>등록된 게시글이 없습니다</h1>
        </div>
        }
        {/* {timeSort === 'newest' && */}
        {viewChange ?
          postList.map((el: MateBoardPostListInterface) => {
            return (
            <div className={style.AnimalCardWrap} key={el.mateBoardIndexNumber}>
              <AnimalCard detailPostMoveHandler={() => detailPostMoveHandler(el)} userId={userInfo[0].account} postData={el} />
            </div>
            );
          })
          :
          <div className={style.tableWrap}>
            <div className={style.tableHeader}>
              <p>번호</p>
              <p>카테고리</p>
              <p>제목</p>
              <p>금액</p>
              <p>날짜</p>
            </div>
          {postList.map((el: MateBoardPostListInterface) => {
            return (
              <div key={el.mateBoardIndexNumber}>
                <MateBoardPostTable detailPostMoveHandler={() => detailPostMoveHandler(el)} userId={userInfo[0].account} postData={el} />
              </div>
            )
          })}
          </div>
        }
        {/* {timeSort === 'oldest' &&
        // 백엔드 코드 재호출 기능으로 적용 필요하다고 판단
          postList.slice(-endIndex, -startIndex).map((el: MateBoardPostListInterface, index:number) => {
            return (
            <div className={style.AnimalCardWrap} key={el.mateBoardIndexNumber}>
              <AnimalCard detailPostMoveHandler={() => detailPostMoveHandler(el)} userId={userInfo[0].account} postData={el} />
            </div>
            );
          })
        } */}
      </div>
      <div className={style.bottom}>
        <div></div>
        <div className={style.bottomPageButton}>
          {props.postTotalCount > 0 && 
          <MateBoardPostButton matePageNumber={props.matePageNumber} setMatePageNumber={props.setMatePageNumber} postTotalCount={props.postTotalCount}/>
          }
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
