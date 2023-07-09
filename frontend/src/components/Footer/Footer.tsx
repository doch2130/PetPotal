import { Link, useNavigate } from 'react-router-dom';
import style from './Footer.module.css';
import { useAlert } from '../../hooks/useAlert';

const footTextArray = [
  ['PetPotal', 'Service', 'About', 'Contact'],
  ['Mate', 'Hospital', 'Beauty', 'Hoteling', 'Hotel', 'Food'],
  ['Follow Us', 'Twitter', 'Instagram', 'Facebook'],
];

export default function Footer() {
  const navigater = useNavigate();
  const { openAlert } = useAlert();

  const movePage = (address:string):void => {
    // console.log('address ', address);
    if(address === 'PetPotal') {
      navigater(`/`);
    } else if(address === 'Mate') {
      navigater(`/mate/board/1`);
    } else {
      navigater(`/${address}`);
    }
    return ;
  }
  const openPrepare = ():void => {
    openAlert({
      type: 'error',
      content: '오픈 준비 중입니다.'
    });
    return ;
  }
  
  return (
    <div className={style.wrap}>
      <div className={style.row} style={{display: 'none'}}>
        <hr />
      </div>

      <div className={style.row}>
        <div className={style.col}>
          <h1 className={style.footLogo}>
            <span>
              <Link to='/'>Pet Potal</Link>
            </span>
          </h1>
        </div>
        <div className={style.col}>
          <div className={style.row}>
            {footTextArray.map((footText, index) => 
              <div className={style.col + ' ' + style.footText} key={index}>
                <ul>
                  {footText.map((el) => {
                    if(el === 'PetPotal' || el === 'Mate') {
                      return (
                        <li key={el} onClick={() => movePage(el)}>{el}</li>
                      )
                    } else {
                      return (
                        <li key={el} onClick={openPrepare}>{el}</li>
                      )
                    }
                  }
                  )}
                </ul>
              </div>
            )}
            <div className={style.col + ' ' + style.footText}></div>
          </div>
        </div>
      </div>
      
      <div className={style.row}>
        <div className={style.col}>
          <p className={style.copyright}>© 2023 PetPotal</p>
        </div>
      </div>
    </div>
  )
}
