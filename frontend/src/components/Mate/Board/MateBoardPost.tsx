import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import writeImage from '../../../assets/icon/pencil.png';
import AnimalCard from '../../UI/AnimalCard';
import style from './MateBoardPost.module.css';
import { useRecoilValue } from 'recoil';
import { UserType, userState } from '../../../recoil/user';
import { useConfirm } from '../../../hooks/useConfirm';
import Controller from '../../../api/controller';
import { useAlert } from '../../../hooks/useAlert';

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
      getMateLikeBoardList();
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo[0].account]);

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
