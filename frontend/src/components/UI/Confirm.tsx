import { MouseEventHandler, useLayoutEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import style from './Confirm.module.css';
import { useConfirm } from '../../hooks/useConfirm';
import WarningIcon from '../../assets/icon/warning.png';

const Backdrop = () => {
  return <div className={style.backdrop} />;
};

const ConfirmOverlay = (props:any) => {
  const { confirmDataState } = props;
  const checkButton = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    checkButton.current?.focus();
  }, []);

  return (
    <div className={style.confirm}>
      <div className={style.header}>
        <img src={WarningIcon} alt='warningIcon' />
      </div>
      <div className={style.content}>
        {confirmDataState.content}
      </div>
      <div className={style.buttonGroup}>
        <button type='button' onClick={props.onClose as MouseEventHandler}>취소</button>
        <button ref={checkButton} type='button' onClick={confirmDataState.callback as MouseEventHandler}>확인</button>
      </div>
    </div>
  );
};

const confirmElement = document.getElementById('confirm') as HTMLDivElement;

function Confirm() {
  const { confirmDataState, closeConfirm } = useConfirm();
  return (
    <>
    {confirmDataState.isOpen && (
      <>
        {ReactDOM.createPortal(
          <Backdrop />,
          confirmElement
        )}
        {ReactDOM.createPortal(
          <ConfirmOverlay onClose={closeConfirm} confirmDataState={confirmDataState} />,
          confirmElement
        )}
      </>
    )}
    </>
  );
};

export default Confirm;
