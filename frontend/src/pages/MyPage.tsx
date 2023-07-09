import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MySideNavbar from '../components/Mypage/MySideNavbar';
import MyInfoCertification from '../components/Mypage/MyInfoCertification';
import MyPet from '../components/Mypage/MyPet';
import MyWrite from '../components/Mypage/MyWrite';
import style from './MyPage.module.css';
import { useAlert } from '../hooks/useAlert';
import MySupport from '../components/Mypage/MySupport';
import MyInterestPost from '../components/Mypage/MyInterestPost';
import LoadingPage from './LoadingPage';
import ErrorPage from './ErrorPage';

export default function MyPage() {
  const { page } = useParams<{ page: string}>();
  const [pageValue, setPageValue] = useState<String>('');
  const { openAlert } = useAlert();
  const navigater = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if(page === 'support') {
      setPageValue('info');
      navigater('/mypage/info');
      openAlert({
        type: 'error',
        content: '서비스 준비 중입니다.',
      });
      return ;
    }

    // console.log('page ', page);
    if(page !== undefined) {
      setPageValue(page);
    } else {
      setPageValue('info');
    }
    setIsLoading(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
    {isLoading ?
    <div className={style.wrap}>
      <div className={style.navWrap}>
        <MySideNavbar pageValue={pageValue} />
      </div>
      <div className={pageValue === 'write' || pageValue === 'support' || pageValue === 'interest' ? `${style.bodyWrap} ${style.bodyWrapWrite}` : style.bodyWrap }>
        {pageValue === 'info' ? <MyInfoCertification /> :
        pageValue === 'pet' ? <MyPet /> :
        pageValue === 'write' ? <MyWrite /> :
        pageValue === 'support' ? <MySupport /> :
        pageValue === 'interest' ? <MyInterestPost /> :
        <ErrorPage />
        }
      </div>
    </div>
    : <LoadingPage />}
    </>
  )
}
