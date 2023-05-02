/* eslint-disable @typescript-eslint/no-unused-vars */
import defaultImg from '../../assets/icon/people.png';
import MyInfoModifyModal from './MyInfoModifyModal';
import style from './MyInfo.module.css';
import { useModal } from '../../hooks/useModal';
import { useAlert } from '../../hooks/useAlert';
import { useConfirm } from '../../hooks/useConfirm';
import Controller from '../../api/controller';
import { useCallback, useEffect, useState } from 'react';

interface userData {
  account: '',
  name: '',
  nickName: '',
  phone: '',
  email: '',
  address: '',
  address4: '',
}

export default function MyInfo() {
  const { openModal, closeModal } = useModal();
  const { openAlert, closeAlert } = useAlert();
  const { openConfirm, closeConfirm } = useConfirm();
  const [userData, setUserData] = useState<userData>();
  const controller = new Controller();

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const userInfoGet = useCallback(async () => {
    const result = await controller.mypageUserInfoGet();
    result.data.address = result.data.address1 + ' ' + result.data.address2 + ' ' + result.data.address3;
    setUserData(result.data);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // userInfoGet();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

      {/* <div className={style.myInfoWrap}>
        <div className={style.myInfoLeft}>
          <div className={style.myImageWrap}>
            <img src={defaultImg} alt='myImage' />
          </div>
        </div>
        <div className={style.myInfoRight}>
          <p>{userData?.account}</p>
          <p>{userData?.nickName}</p>
          <p>{userData?.phone}</p>
          <p>{userData?.address}</p>
          <p>{userData?.address4}</p>
        </div>
      </div> */}

      <div className={style.buttonGroup}>
        <button type='button' className={style.fullButton} onClick={() => openModal(modalData)}>수정</button>
        <button type='button' className={style.fullButton} onClick={leave}>탈퇴</button>
      </div>
    </div>
  )
}
