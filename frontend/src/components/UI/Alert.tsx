import { MouseEventHandler } from 'react';
import ReactDOM from 'react-dom';
import { useAlert } from '../../hooks/useAlert';
import style from './Alert.module.css';

const Backdrop = () => {
  return <div className={style.backdrop} />;
};

const AlertOverlay = (props:any) => {
  const { alertDataState } = props;
  return (
    <div className={style.alert}>
      <div className={style.header}>
        {alertDataState.type === 'success' ?
        <svg className={style.checkMark} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
          <circle className={style.checkMarkCircle} cx="26" cy="26" r="25" fill="none"/>
          <path className={style.checkMarkCheck} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
        </svg>
        : null }
        {alertDataState.type === 'error' ?
        <svg className={style.errorMark} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
          <circle className={style.errorMarkCircle} cx="26" cy="26" r="25" fill="none"/>
          <path className={style.errorMarkCheck} fill="none" d="M16 16 36 36 M36 16 16 36" />
        </svg>
        : null }
      </div>
      <div className={style.content}>
        {alertDataState.content}
      </div>
      <div className={style.footer}>
        <button type='button' onClick={props.onClose as MouseEventHandler}>확인</button>
      </div>
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
