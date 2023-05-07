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
