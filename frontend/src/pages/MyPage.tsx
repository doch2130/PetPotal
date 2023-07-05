import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MySideNavbar from '../components/Mypage/MySideNavbar';
import MyInfoCertification from '../components/Mypage/MyInfoCertification';
import MyPet from '../components/Mypage/MyPet';
import MyWrite from '../components/Mypage/MyWrite';
import style from './MyPage.module.css';
import { useAlert } from '../hooks/useAlert';
import MySupport from '../components/Mypage/MySupport';

export default function MyPage() {
  const { page } = useParams<{ page: string}>();
  const [pageValue, setPageValue] = useState<String>('');
  const { openAlert } = useAlert();
  const navigater = useNavigate();

  useEffect(() => {
    if(page === 'interest') {
      setPageValue('info');
      navigater('/mypage/info');
      openAlert({
        title: '준비중',
        type: 'error',
        content: '서비스 준비 중입니다.',
      });
      return ;
    }

    if(page !== undefined) {
      setPageValue(page);
    } else {
      setPageValue('info');
    }
  }, [page]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={style.wrap}>
      <div className={style.navWrap}>
        <MySideNavbar pageValue={pageValue} />
      </div>
      <div className={pageValue === 'write' || pageValue === 'support' ? `${style.bodyWrap} ${style.bodyWrapWrite}` : style.bodyWrap }>
        {pageValue === 'info' ? <MyInfoCertification /> : null}
        {pageValue === 'pet' ? <MyPet /> : null}
        {pageValue === 'write' ? <MyWrite /> : null}
        {pageValue === 'support' ? <MySupport /> : null}
        {pageValue === 'interest' ? <MyWrite /> : null}
      </div>
    </div>
  )
}
