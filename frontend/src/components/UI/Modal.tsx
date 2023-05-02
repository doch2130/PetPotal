import { MouseEventHandler } from 'react';
import ReactDOM from 'react-dom';
import { useModal } from '../../hooks/useModal';
import style from './Modal.module.css';
import close from '../../assets/icon/plus.png';

const Backdrop = (props:any) => {
  return <div className={style.backdrop} onClick={props.onClose as MouseEventHandler} />;
};

const ModalOverlay = (props:any) => {
  const { modalDataState } = props;
  return (
    <div className={style.modal}>
      <div className={style.wrapClose} onClick={props.onClose as MouseEventHandler}>
        <img src={close} alt='closeBtn' />
      </div>
      <div className={style.content}>{modalDataState.content}</div>
    </div>
  );
};

const modalElement = document.getElementById('modal') as HTMLDivElement;

function Modal() {
  const { modalDataState, closeModal } = useModal();
  return (
    <>
    {modalDataState.isOpen && (
      <>
        {ReactDOM.createPortal(
          <Backdrop onClose={closeModal} />,
          modalElement
        )}
        {ReactDOM.createPortal(
          <ModalOverlay onClose={closeModal} modalDataState={modalDataState} />,
          modalElement
        )}
      </>
    )}
    </>
  );
};

export default Modal;
