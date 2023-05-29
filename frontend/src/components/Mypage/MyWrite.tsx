import style from './MyWrite.module.css';

const tempData: any[] = [
  {
    id: 1,
    category: '구함',
    title: '제목을 작성합니다제목을 작성합니다제목을 작성합니다제목을 작성합니다제목을 작성합니다',
    time: '2023-04-18 01:30',
  },
  {
    id: 2,
    category: '지원',
    title: '제목을 작성합니다',
    time: '2023-04-18 01:30',
  },
  {
    id: 1,
    category: '구함',
    title: '제목을 작성합니다제목을 작성합니다제목을 작성합니다제목을 작성합니다제목을 작성합니다',
    time: '2023-04-18 01:30',
  },
  {
    id: 2,
    category: '지원',
    title: '제목을 작성합니다',
    time: '2023-04-18 01:30',
  },
  {
    id: 1,
    category: '구함',
    title: '제목을 작성합니다제목을 작성합니다제목을 작성합니다제목을 작성합니다제목을 작성합니다',
    time: '2023-04-18 01:30',
  },
  {
    id: 2,
    category: '지원',
    title: '제목을 작성합니다',
    time: '2023-04-18 01:30',
  },
  {
    id: 1,
    category: '구함',
    title: '제목을 작성합니다제목을 작성합니다제목을 작성합니다제목을 작성합니다제목을 작성합니다',
    time: '2023-04-18 01:30',
  },
  {
    id: 2,
    category: '지원',
    title: '제목을 작성합니다',
    time: '2023-04-18 01:30',
  },
  {
    id: 1,
    category: '구함',
    title: '제목을 작성합니다제목을 작성합니다제목을 작성합니다제목을 작성합니다제목을 작성합니다',
    time: '2023-04-18 01:30',
  },
  {
    id: 2,
    category: '지원',
    title: '제목을 작성합니다',
    time: '2023-04-18 01:30',
  },
];

export default function MyWrite() {
  return (
    <div className={style.wrap}>
      <div className={style.wrapTop}>
      {tempData?.length > 0 && <button type='button' className={style.fullButton + ' ' + style.topButton}>변경</button>}
      </div>
      {tempData?.length === 0 ? 
      <h2 className={style.zeroContent}>작성한 글이 없습니다.</h2>
      :
      <>
      <div className={style.wrapDivUl}>
        <ul className={style.wrapUl}>
        {tempData?.map((el, index) => {
          return (
            <li key={index}>
              <p>{index + 100}.</p>
              <p>{el.category}</p>
              <p>{el.title}</p>
              <p>{el.time}</p>
            </li>
          )
        })}
        </ul>
      </div>
      <div className={style.wrapBottom}>
        <button type='button' className={style.fullNumButton}>{'<<'}</button>
        <button type='button' className={style.fullNumButton}>{'<'}</button>
        <button type='button' className={style.fullNumButton + ' ' + style.active}>1</button>
        <button type='button' className={style.fullNumButton}>2</button>
        <button type='button' className={style.fullNumButton}>3</button>
        <button type='button' className={style.fullNumButton}>{'>'}</button>
        <button type='button' className={style.fullNumButton}>{'>>'}</button>
      </div>
      </>
      }
    </div>
  )
}
