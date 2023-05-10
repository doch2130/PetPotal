/* eslint-disable @typescript-eslint/no-unused-vars */
import defaultImg from '../../assets/profile/default.png';
import MyInfoModifyModal from './MyInfoModifyModal';
import style from './MyInfo.module.css';
import { useModal } from '../../hooks/useModal';
import { useAlert } from '../../hooks/useAlert';
import { useConfirm } from '../../hooks/useConfirm';
import Controller from '../../api/controller';
import { useCallback, useEffect, useState } from 'react';
import { UserType, userState } from '../../recoil/user';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

interface userDataInterface {
  account: '',
  name: '',
  nickName: '',
  phone: '',
  email: '',
  address1: '',
  address2: '',
  address3: '',
  address4: '',
}

export default function MyInfo() {
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();
  const { openAlert } = useAlert();
  const { openConfirm, closeConfirm } = useConfirm();
  const [userInfo, setUserInfo] = useRecoilState<UserType[]>(userState);
  const controller = new Controller();
  const [userData, setUserData] = useState<userDataInterface>({
    account: '',
    name: '',
    nickName: '',
    phone: '',
    email: '',
    address1: '',
    address2: '',
    address3: '',
    address4: '',
  });

  const [profileImage, setProfileImage] = useState<string>(defaultImg);

  // 회원탈퇴
  const memberWithdrawal = () => {
    openConfirm({
      title: '회원탈퇴',
      content: '정말로 회원을 탈퇴하시겠습니까?',
      callback: async () => {
        openAlert({
          title: '회원탈퇴 실패',
          type: 'error',
          content: '에러가 발생하였습니다.\r\n새로고침 후 다시 시도해주세요'
        });
        const result = await controller.withdrawal();
        if(result.data.responseCode !== 200) {
          openAlert({
            title: '회원탈퇴 실패',
            type: 'error',
            content: '에러가 발생하였습니다.\r\n새로고침 후 다시 시도해주세요'
          });
          return ;
        }

        closeConfirm();
        openAlert({
          title: '회원탈퇴 성공',
          type: 'success',
          content: '회원탈퇴가 정상적으로 완료되었습니다'
        });
        setUserInfo([{
          account: '',
          address1: '',
          address2: '',
          address3: '',
          message: '',
          responseCode: 0,
        }]);
        navigate('/');
      },
    });
  }

  // 회원수정 창 열기
  const mermberModifyOpen = () => {
    const ModalContent = () => (
      <MyInfoModifyModal onClose={closeModal} userData={userData} setUserData={setUserData}
        profileImage={profileImage} setProfileImage={setProfileImage} />
    );

    openModal({
      title: "회원정보 수정",
      content: <ModalContent />
    });
  }

  // 회원정보 불러오기
  const userInfoGet = useCallback(async () => {
    const result = await controller.myUserInfoLoad();
    console.log('result : ', result);
    if(result.data.responseCode !== 200) {
      alert('에러가 발생했습니다');
      return ;
    }
    setUserData(result.data.data);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 회원정보 불러오기
  useEffect(() => {
    userInfoGet();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    console.log('userData : ', userData);
  }, [userData]);

  return (
    <div className={style.wrap}>
      <h2>회원정보</h2>
      <div className={style.myInfoWrap}>
        <div className={style.myInfoLeft}>
          <div className={style.myImageWrap}>
            <img src={profileImage} alt='MyProfileImage' />
          </div>
        </div>
        <div className={style.myInfoRight}>
          <p>{userData.account}</p>
          <p>{userData.nickName}</p>
          <p>{userData.phone}</p>
          <p>{userData.address1 + ' ' + userData.address2 + ' ' + userData.address3}</p>
          <p>{userData.address4}</p>
        </div>
      </div>
      <div className={style.buttonGroup}>
        <button type='button' className={style.fullButton} onClick={mermberModifyOpen}>수정</button>
        <button type='button' className={style.fullButton} onClick={memberWithdrawal}>탈퇴</button>
      </div>
    </div>
  )
}
