import { useParams } from 'react-router-dom';
import MyInfo from '../components/Mypage/MyInfo';
import MyNavbar from '../components/Mypage/MyNavbar';
import style from './MyPage.module.css';
import { useEffect, useState } from 'react';

export default function MyPage() {
  const { page } = useParams<{ page: string}>();
  const [pageValue, setPageValue] = useState<String>('');

  useEffect(() => {
    if(page !== undefined) setPageValue(page);
  }, [page]);

  return (
    <div className={style.wrap}>
      <div className={style.navWrap}>
        <MyNavbar pageValue={pageValue} />
      </div>
      <div className={style.bodyWrap}>
        {pageValue === 'info' ? <MyInfo /> : null}
        {pageValue === 'write' ? null : null}
        {pageValue === 'support' ? null : null}
        {pageValue === 'info' ? null : null}
        {pageValue === 'interest' ? null : null}
      </div>
    </div>
  )
}
