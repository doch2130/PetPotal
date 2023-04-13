import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import style from './Navbar.module.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const historyValue = useParams();
  console.log(historyValue);
  const searchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${keyword}`);
    /**
     * 2023.04.11 gkfrjt
     * 검색 경로로 이동시키기
     * css 적용시켜놓기
     * 회원가입페이지 적용시키기
     */
  };

  const handleKeyword = (e) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    setKeyword(historyValue.keyword);
  }, [historyValue]);

  return (
    <header>
      <article className={style.navbarContainer}>
        <section className={style.navbarWrapper}>
          <div className={style.navbarTop}>
            <ul className={style.topInner}>
              <li>
                <Link to={'/memberjoin'}>회원가입</Link>
              </li>
              <li>
                <Link to={'/login'}>로그인</Link>
              </li>
              <li>고객센터</li>
            </ul>
          </div>

          <div className={style.navbarMiddle}>
            <h1 className={style.navbarLogo}>
              <Link to={'/'}>Pet Portal</Link>
            </h1>
            <form onSubmit={searchSubmit} className={style.searchForm}>
              <input
                onChange={handleKeyword}
                type="search"
                className={style.searchInput}
                value={keyword || ''}
              />
              <button className={style.searchBtn}>아이콘</button>
            </form>
            <ul className={style.headerItem}>
              <li>아이콘1</li>
              <li>아이콘2</li>
              <li>아이콘3</li>
            </ul>
          </div>

          <nav className={style.navbarBottom}>
            <ul className={style.menu}>
              <li className={style.menuItem}>
                <a href="#" className={style.menuItemLink}>
                  메이트
                </a>
              </li>
              <li className={style.menuItem}>
                <a href="#" className={style.menuItemLink}>
                  메이트
                </a>
              </li>
              <li className={style.menuItem}>
                <a href="#" className={style.menuItemLink}>
                  병원
                </a>
              </li>
              <li className={style.menuItem}>
                <a href="#" className={style.menuItemLink}>
                  호텔링
                </a>
              </li>
              <li className={style.menuItem}>
                <a href="#" className={style.menuItemLink}>
                  숙박
                </a>
              </li>
              <li className={style.menuItem}>
                <a href="#" className={style.menuItemLink}>
                  음식
                </a>
              </li>
            </ul>
          </nav>
        </section>
      </article>
    </header>
  );
}
