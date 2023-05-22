import { useParams } from 'react-router-dom';
import MyInfo from '../components/Mypage/MyInfo';
import MySideNavbar from '../components/Mypage/MySideNavbar';
import style from './MyPage.module.css';
import { useEffect, useState } from 'react';
import PrivatePage from './PrivatePage';
import MyPet from '../components/Mypage/MyPet';
import MyWrite from '../components/Mypage/MyWrite';

export default function MyPage() {
  const { page } = useParams<{ page: string}>();
  const [pageValue, setPageValue] = useState<String>('');
  const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);

  // console.log('windowSize ', innerWidth);

  useEffect(() => {
    if(page !== undefined) setPageValue(page);
  }, [page]);

  useEffect(() => {
    const resizeListener = () => {
      setInnerWidth(window.innerWidth);
    }

    window.addEventListener('resize', resizeListener);
  }, []);

  return (
    <PrivatePage>
      <div className={style.wrap}>
        <div className={style.navWrap}>
          <MySideNavbar pageValue={pageValue} />
        </div>
        <div className={style.bodyWrap}>
          {pageValue === 'info' ? <MyInfo /> : null}
          {pageValue === 'pet' ? <MyPet /> : null}
          {pageValue === 'write' ? <MyWrite /> : null}
          {pageValue === 'support' ? null : null}
          {pageValue === 'interest' ? null : null}
        </div>
      </div>
    </PrivatePage>
  )
}
