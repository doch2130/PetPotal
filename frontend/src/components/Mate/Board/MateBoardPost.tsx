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

export default function MateBoardPost() {
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

  const historyValue = useParams();
  const [ matePageNumber, setMatePageNumber ] = useState<string>('1');
  useEffect(():void => {
    const historyKeyword = historyValue.pageNumber;

    if(historyKeyword) setMatePageNumber(historyKeyword);

  }, [historyValue]);

  // React Query hook 
  // 임시 주석
  // hook으로 사용할 경우, backend의 auth 함수가 실행되기 전에 실행이 되므로
  // header에 token이 저장되지 않는다.
  // const { token } = request.signedCookies; 를 사용하는 방법 등을 사용하면 해결할 수 있다.
  // const temp = useGetMateBoardListQuery({matePageNumber});
  // console.log('temp ', temp);

  // React Query default
  // 임시 주석
  // const { status, data, error } = useGetMateBoardList(matePageNumber);
  // function useGetMateBoardList(matePageNumber:string) {
  //     return useQuery({
  //       queryKey: ['mateBoardList'],
  //       queryFn: async () => {
  //         const result = await controller.mateBoardList(matePageNumber);
  //         return result.data;
  //       }
  //     });
  // }

  return (
    <div className={style.wrap}>
      <div className={style.header}>
        <p>55개 게시글</p>
        <div className={style.headerSort}>
          <p>정렬</p>
          <select>
            <option defaultValue='최신순'>최신순</option>
            <option defaultValue='오래된순'>오래된 순</option>
          </select>
        </div>
      </div>
      <div className={style.body}>
        {tempData.map((el, index) => {
          return (
            <div className={style.AnimalCardWrap} key={index}>
              <AnimalCard detailPostMoveHandler={detailPostMoveHandler} />
            </div>
          );
        })}
      </div>
      <div className={style.bottom}>
        <div></div>
        <div className={style.bottomPageButton}>
          <button type='button'>&lt;&lt;</button>
          <button type='button'>&lt;</button>
          <button type='button' className={style.bottomPageButtonActive}>1</button>
          <button type='button'>2</button>
          <button type='button'>3</button>
          <button type='button'>&gt;</button>
          <button type='button'>&gt;&gt;</button>
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
