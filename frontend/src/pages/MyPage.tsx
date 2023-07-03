import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MySideNavbar from '../components/Mypage/MySideNavbar';
import MyInfoCertification from '../components/Mypage/MyInfoCertification';
import MyPet from '../components/Mypage/MyPet';
import MyWrite from '../components/Mypage/MyWrite';
import style from './MyPage.module.css';

export default function MyPage() {
  const { page } = useParams<{ page: string}>();
  const [pageValue, setPageValue] = useState<String>('');

  useEffect(() => {
    if(page !== undefined) setPageValue(page);
  }, [page]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={style.wrap}>
      <div className={style.navWrap}>
        <MySideNavbar pageValue={pageValue} />
      </div>
      <div className={pageValue === 'write' ? `${style.bodyWrap} ${style.bodyWrapWrite}` : style.bodyWrap }>
        {pageValue === 'info' ? <MyInfoCertification /> : null}
        {pageValue === 'pet' ? <MyPet /> : null}
        {pageValue === 'write' ? <MyWrite /> : null}
        {pageValue === 'support' ? <MyWrite /> : null}
        {pageValue === 'interest' ? <MyWrite /> : null}
      </div>
    </div>
  )
}
