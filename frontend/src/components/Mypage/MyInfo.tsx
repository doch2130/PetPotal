import defaultImg from '../../assets/icon/people.png';
import MyInfoModifyModal from './MyInfoModifyModal';
import style from './MyInfo.module.css';
import { useModal } from '../../hooks/useModal';
import { useAlert } from '../../hooks/useAlert';
import { useConfirm } from '../../hooks/useConfirm';

export default function MyInfo() {
  const { openModal, closeModal } = useModal();
  const { openAlert, closeAlert } = useAlert();
  const { openConfirm, closeConfirm } = useConfirm();

  const leave = () => {
    openConfirm({
      title: 'confirm',
      content: 'confirm 창',
      callback: () => {
        console.log("Yes!");
      },
    });

    openModal({
      title: 'alert',
      content: 'alert 창'
    });
  }

  const ModalContent = () => (
    <MyInfoModifyModal onClose={closeModal} />
  );

  const modalData = {
    title: "Modal Title",
    content: <ModalContent />,
    callback: () => alert("Modal Callback()")
  };

  return (
    <div className={style.wrap}>
      <h2>회원정보</h2>
      <div className={style.myInfoWrap}>
        <div className={style.myInfoLeft}>
          <div className={style.myImageWrap}>
            <img src={defaultImg} alt='myImage' />
          </div>
        </div>
        <div className={style.myInfoRight}>
          <p>test1</p>
          <p>테스트닉네임</p>
          <p>010-1234-5678</p>
          <p>서울시 중구 중림동</p>
          <p>744-55 자이아파트 101동</p>
        </div>
      </div>
      <div className={style.buttonGroup}>
        <button type='button' className={style.fullButton} onClick={() => openModal(modalData)}>수정</button>
        <button type='button' className={style.fullButton} onClick={leave}>탈퇴</button>
      </div>
    </div>
  )
}
