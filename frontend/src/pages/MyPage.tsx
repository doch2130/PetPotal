import { useParams } from 'react-router-dom';
import MyInfo from '../components/Mypage/MyInfo';
import MyNavbar from '../components/Mypage/MyNavbar';
import style from './MyPage.module.css';
import { useEffect, useState } from 'react';

export default function MyPage() {
  const { page } = useParams<{ page: string}>();
  const [pageValue, setPageValue] = useState<String>('');
  const [modalShow, setModalShow] = useState<Boolean>(false);
  
  const modalOpen = () => {
    setModalShow(true);
  }

  const modalClose = () => {
    setModalShow(false);
  }

  useEffect(() => {
    if(page !== undefined) setPageValue(page);
  }, [page]);

  return (
    <div className={style.wrap}>
      <div className={style.navWrap}>
        <MyNavbar pageValue={pageValue} />
      </div>
      <div className={style.bodyWrap}>
        {/* {pageValue === 'info' ? <MyInfo /> : null} */}
        {pageValue === 'info' ?
          <MyInfo modalShow={modalShow} onModalOpen={modalOpen} onModalClose={modalClose} /> : null}
        {pageValue === 'write' ? null : null}
        {pageValue === 'support' ? null : null}
        {pageValue === 'info' ? null : null}
        {pageValue === 'interest' ? null : null}
      </div>
    </div>
  )
}
