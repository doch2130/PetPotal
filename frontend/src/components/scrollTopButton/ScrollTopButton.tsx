import { useEffect, useState } from 'react'
import TopButtonImg from '../../assets/icon/topButton.png';
import style from './ScrollTopButton.module.css';

export default function ScrollTopButton() {
  // const [scrollY, setScrollY] = useState(0);
  const [isShow, setIsShow] = useState(false);
  
  const handleTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    // setScrollY(0);
    setIsShow(false);
  }

  useEffect(() => {
    if(window.scrollY >= 800 && isShow === false) setIsShow(true)
  }, [isShow]);

  return (
    <>
    {isShow && <div className={style.wrap} onClick={() => handleTop()}>
      <img src={TopButtonImg} alt='TopButtonImage' />
    </div>}
    </>
  )
}
