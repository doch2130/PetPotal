import { MouseEventHandler } from 'react';
import ReactDOM from 'react-dom';
import style from './Modal.module.css';
import close from '../../assets/icon/plus.png';

interface propsData {
  onClose: Function;
  children: React.ReactNode;
}

const Backdrop = (props:any) => {
  return <div className={style.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props:any) => {
  return (
    <div className={style.modal}>
      <div className={style.content}>{props.children}</div>
    </div>
  );
};

const modalElement = document.getElementById('modal') as HTMLDivElement;

const Modal = (props:propsData) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} children={undefined} />,
        modalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>
          <div className={style.wrapClose} onClick={props.onClose as MouseEventHandler}>
            <img src={close} alt='closeBtn' />
          </div>
          {props.children}
        </ModalOverlay>,
        modalElement
      )}
    </>
  );
};

export default Modal;

