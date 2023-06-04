import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import writeImage from '../../../assets/icon/pencil.png';
import AnimalCard from '../../UI/AnimalCard';
import style from './MateBoardPost.module.css';

export default function MateBoardPost() {
  const navigater = useNavigate();
  const [ tempData, setTempData ] = useState<string[]>([
    'test1', 'test2', 'test3', 'test4', 'test5', 'test6', 'test7', 'test8'
  ]);

  const detailPostMoveHandler = () => {
    navigater('/mate/detail/1');
  }

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
          <button type='button'><Link to='/mate/write'><img src={writeImage} alt='writeImage' />
            글쓰기</Link>
          </button>
        </div>
      </div>
    </div>
  )
}
