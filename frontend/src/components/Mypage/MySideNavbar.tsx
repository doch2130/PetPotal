import { Link } from 'react-router-dom';
import style from './MySideNavbar.module.css';

interface propsData {
  pageValue: String;
}

export default function MySideNavbar(props:propsData) {
  const { pageValue } = props;

  const menuDefault = style.menu;
  const menuActive = style.menu + ' ' + style.active;

  return (
    <div className={style.wrap}>
      <h2>마이 페이지</h2>
      <div className={pageValue === 'info' ? menuActive : menuDefault}>
        <Link to='/mypage/info'>회원정보</Link>
      </div>
      <div className={pageValue === 'pet' ? menuActive : menuDefault}>
        <Link to='/mypage/pet'>나의 반려동물</Link>
      </div>
      <div className={pageValue === 'write' ? menuActive : menuDefault}>
        <Link to='/mypage/write'>내가 작성한 글</Link>
      </div>
      <div className={pageValue === 'support' ? menuActive : menuDefault}>
        <Link to='/mypage/support'>내가 지원한 글</Link>
      </div>
      <div className={pageValue === 'interest' ? menuActive : menuDefault}>
        <Link to='/mypage/interest'>관심 글</Link>
      </div>
    </div>
  )
}
