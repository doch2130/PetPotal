import { Link } from 'react-router-dom';
import style from './MySideNavbar.module.css';

interface MySideNavbarInterface {
  pageValue: String;
}

export default function MySideNavbar(props:MySideNavbarInterface) {
  const { pageValue } = props;

  const menuDefault = style.menu;
  const menuActive = style.menu + ' ' + style.active;

  return (
    <div className={style.wrap}>
      <h2 className={style.wrapText}>마이 페이지</h2>
      <div className={pageValue === 'info' ? menuActive : menuDefault}>
        <Link to='/mypage/info' className={style.wrapText}>회원정보</Link>
        <Link to='/mypage/info' className={style.wrapImage}>
          <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
            <path d="M258.9 48C141.92 46.42 46.42 141.92 48 258.9c1.56 112.19 92.91 203.54 205.1 205.1 117 1.6 212.48-93.9 210.88-210.88C462.44 140.91 371.09 49.56 258.9 48zm126.42 327.25a4 4 0 01-6.14-.32 124.27 124.27 0 00-32.35-29.59C321.37 329 289.11 320 256 320s-65.37 9-90.83 25.34a124.24 124.24 0 00-32.35 29.58 4 4 0 01-6.14.32A175.32 175.32 0 0180 259c-1.63-97.31 78.22-178.76 175.57-179S432 158.81 432 256a175.32 175.32 0 01-46.68 119.25z"/><path d="M256 144c-19.72 0-37.55 7.39-50.22 20.82s-19 32-17.57 51.93C191.11 256 221.52 288 256 288s64.83-32 67.79-71.24c1.48-19.74-4.8-38.14-17.68-51.82C293.39 151.44 275.59 144 256 144z"/>
          </svg>
        </Link>
      </div>
      <div className={pageValue === 'pet' ? menuActive : menuDefault}>
        <Link to='/mypage/pet' className={style.wrapText}>나의 반려동물</Link>
        <Link to='/mypage/pet' className={style.wrapImage}>
          <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
            <path fill='#ffffff' stroke='none' d="M0 0L0 182L1 182C4.1983 141.811 48.4441 103.739 87 128.699C112.689 145.33 120.338 174.302 119.996 203C119.454 248.569 66.4607 295.102 26 257.907C19.3749 251.816 13.5737 244.97 9.3233 237C4.96614 228.83 1.73551 219.242 1 210L0 210L0 512L166 512L166 511C106.517 509.772 50.1512 440.649 61.8079 382C68.0112 350.789 97.3383 341.298 115.331 318.985C127.251 304.203 129.049 283.219 139.229 267C160.867 232.525 203.873 212.481 244 212.004C292.242 211.43 341.415 221.599 370.795 264C382.305 280.612 383.852 302.274 395.9 317.996C411.682 338.592 439.055 347.533 447.996 374C468.336 434.208 407.534 508.394 347 511L347 512L512 512L512 210L511 210C507.802 250.189 463.556 288.261 425 263.301C399.311 246.67 391.662 217.698 392.004 189C392.546 143.431 445.539 96.8981 486 134.093C492.625 140.184 498.426 147.03 502.677 155C507.034 163.17 510.264 172.758 511 182L512 182L512 0L341 0L341 1C361.699 4.05698 378.002 23.45 385.189 42C401.857 85.0231 381.926 150.641 328 149.996C309.548 149.775 293.774 136.74 284.004 122C259.793 85.4759 268.6 8.73874 321 1L321 0L191 0L191 1C243.4 8.73871 252.207 85.4759 227.996 122C218.226 136.74 202.452 149.775 184 149.996C130.074 150.641 110.143 85.0232 126.811 42C133.997 23.45 150.301 4.05695 171 1C157.879 -4.50568 134.3 0 120 0L0 0z"/>
            <path stroke='none' d="M171 0.464508C94.1329 14.299 109.031 164.288 191 149.535C267.867 135.701 252.969 -14.2882 171 0.464508M321 0.464508C244.133 14.299 259.031 164.288 341 149.535C417.867 135.701 402.969 -14.2882 321 0.464508M50 121.465C-26.8671 135.299 -11.9687 285.288 70 270.535C146.867 256.701 131.969 106.712 50 121.465M442 121.465C365.133 135.299 380.031 285.288 462 270.535C538.867 256.701 523.969 106.712 442 121.465M237 212.424C198.587 217.483 160.865 231.528 139.229 266C129.636 281.285 127.743 300.5 117.56 315C105.026 332.849 82.9316 341.62 70.5201 360C44.937 397.885 69.8719 453.119 99 480.961C127.699 508.392 169.772 517.364 208 509.55C225.118 506.051 240.049 496.582 258 497.015C270.921 497.326 281.904 503.298 294 506.856C310.549 511.723 328.765 513.83 346 511.714C406.04 504.34 467.032 441.147 449.255 377C441.198 347.928 412.654 339.021 395.9 316.999C383.64 300.885 382.12 278.864 370.09 262C341.063 221.309 284.999 206.104 237 212.424z"/>
            <path fill='#ffffff' stroke='none' d="M196 511L196 512L316 512C309.375 509.142 301.034 508.72 294 506.565C278.808 501.91 265.439 495.267 249 497.286C230.684 499.536 214.632 510.2 196 511z"/>
          </svg>
        </Link>
      </div>
      <div className={pageValue === 'write' ? menuActive : menuDefault}>
        <Link to='/mypage/write' className={style.wrapText}>내가 작성한 글</Link>
        <Link to='/mypage/write' className={style.wrapImage}>
          <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M364.13 125.25L87 403l-23 45 44.99-23 277.76-277.13-22.62-22.62zM420.69 68.69l-22.62 22.62 22.62 22.63 22.62-22.63a16 16 0 000-22.62h0a16 16 0 00-22.62 0z"/>
          </svg>
        </Link>
      </div>
      <div className={pageValue === 'support' ? menuActive : menuDefault}>
        <Link to='/mypage/support' className={style.wrapText}>내가 지원한 글</Link>
        <Link to='/mypage/support' className={style.wrapImage} >
          <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
            <path d="M432 320V144a32 32 0 00-32-32h0a32 32 0 00-32 32v112M368 256V80a32 32 0 00-32-32h0a32 32 0 00-32 32v160M240 241V96a32 32 0 00-32-32h0a32 32 0 00-32 32v224M304 240V48a32 32 0 00-32-32h0a32 32 0 00-32 32v192" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
            <path d="M432 320c0 117.4-64 176-152 176s-123.71-39.6-144-88L83.33 264c-6.66-18.05-3.64-34.79 11.87-43.6h0c15.52-8.82 35.91-4.28 44.31 11.68L176 320" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
          </svg>
        </Link>
      </div>
      <div className={pageValue === 'interest' ? menuActive : menuDefault}>
        <Link to='/mypage/interest' className={style.wrapText} >관심 글</Link>
        <Link to='/mypage/interest' className={style.wrapImage} >
          <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
            <path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32"/>
            <path d="M256 360a16 16 0 01-9-2.78c-39.3-26.68-56.32-45-65.7-56.41-20-24.37-29.58-49.4-29.3-76.5.31-31.06 25.22-56.33 55.53-56.33 20.4 0 35 10.63 44.1 20.41a6 6 0 008.72 0c9.11-9.78 23.7-20.41 44.1-20.41 30.31 0 55.22 25.27 55.53 56.33.28 27.1-9.31 52.13-29.3 76.5-9.38 11.44-26.4 29.73-65.7 56.41A16 16 0 01256 360z" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
