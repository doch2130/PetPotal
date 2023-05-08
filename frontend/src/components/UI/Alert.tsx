import { MouseEventHandler } from 'react';
import ReactDOM from 'react-dom';
import { useAlert } from '../../hooks/useAlert';
import style from './Alert.module.css';
import check from '../../assets/icon/check.svg';

const Backdrop = () => {
  return <div className={style.backdrop} />;
};

const AlertOverlay = (props:any) => {
  const { alertDataState } = props;
  return (
    <div className={style.alert}>
      <div className={style.header}>
        {/* <img src={check} alt='checkIcon' /> */}
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
          width="60pt" height="60pt" viewBox="0 0 1248.000000 1280.000000" preserveAspectRatio="xMidYMid meet">
          <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)" fill="#a5dc86" stroke="none">
            <path d="M10990 12794 c-148 -18 -348 -78 -471 -139 -171 -87 -363 -246 -469
            -390 -25 -33 -1255 -1609 -2733 -3503 -1740 -2227 -2693 -3440 -2700 -3435
            -55 33 -2153 1554 -2234 1620 -244 198 -479 321 -738 389 -135 35 -374 45
            -519 20 -558 -95 -991 -521 -1103 -1084 -12 -61 -17 -136 -17 -252 -1 -179 18
            -297 71 -444 36 -101 125 -270 181 -346 27 -36 462 -535 967 -1110 1869 -2125
            2583 -2940 3089 -3522 l519 -597 27 37 c153 212 7390 10657 7431 10725 317
            525 223 1224 -222 1653 -251 241 -556 370 -899 378 -80 3 -161 2 -180 0z" />
          </g>
        </svg>
        <svg className={style.movingcircle} width="220" height="220" viewBox="0 0 168 168" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M163 84C163 127.63 127.63 163 84 163C40.3695 163 5 127.63 5 84C5 40.3695 40.3695 5 84 5C127.63 5 163 40.3695 163 84Z" stroke="red" strokeWidth="1"/>
        </svg>
      </div>
      <div className={style.content}>{alertDataState.content}</div>
      <button type='button' onClick={props.onClose as MouseEventHandler}>확인</button>
    </div>
  );
};

const alertElement = document.getElementById('alert') as HTMLDivElement;

const Alert = () => {
  const { alertDataState, closeAlert } = useAlert();
  return (
    <>
    {alertDataState.isOpen && (
      <>
        {ReactDOM.createPortal(
          <Backdrop />,
          alertElement
        )}
        {ReactDOM.createPortal(
          <AlertOverlay onClose={closeAlert} alertDataState={alertDataState} />,
          alertElement
        )}
      </>
    )}
    </>
  );
};

export default Alert;
