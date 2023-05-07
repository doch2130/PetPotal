import { useParams } from 'react-router-dom';
import MyInfo from '../components/Mypage/MyInfo';
import MySideNavbar from '../components/Mypage/MySideNavbar';
import style from './MyPage.module.css';
import { useEffect, useState } from 'react';
import PrivatePage from './PrivatePage';
import MyPet from '../components/Mypage/MyPet';

export default function MyPage() {
  const { page } = useParams<{ page: string}>();
  const [pageValue, setPageValue] = useState<String>('');
  
  useEffect(() => {
    if(page !== undefined) setPageValue(page);
  }, [page]);

  return (
    <PrivatePage>
      <div className={style.wrap}>
        <div className={style.navWrap}>
          <MySideNavbar pageValue={pageValue} />
        </div>
        <div className={style.bodyWrap}>
          {pageValue === 'info' ? <MyInfo /> : null}
          {pageValue === 'pet' ? <MyPet /> : null}
          {pageValue === 'write' ? null : null}
          {pageValue === 'support' ? null : null}
          {pageValue === 'interest' ? null : null}
        </div>
      </div>
    </PrivatePage>
  )
}
