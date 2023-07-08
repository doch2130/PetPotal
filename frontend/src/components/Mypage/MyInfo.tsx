/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { UserType, userState } from '../../recoil/user';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../hooks/useModal';
import { useAlert } from '../../hooks/useAlert';
import { useConfirm } from '../../hooks/useConfirm';
import Controller from '../../api/controller';
import MyInfoPasswordChangeModal from './MyInfoPasswordChangeModal';
import MyInfoModifyModal from './MyInfoModifyModal';
import defaultImg from '../../assets/profile/default.png';
import style from './MyInfo.module.css';

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

interface MyInfoInterface {
  userData: userDataInterface;
  setUserData: Function;
  setCertification: Function;
}

export default function MyInfo(props:MyInfoInterface) {
  const { userData, setUserData, setCertification } = props;
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();
  const { openAlert } = useAlert();
  const { openConfirm, closeConfirm } = useConfirm();
  const [userInfo, setUserInfo] = useRecoilState<UserType[]>(userState);
  const controller = new Controller();
  const [profileImage, setProfileImage] = useState<string>(defaultImg);

  // 회원탈퇴
  const memberSignOut = ():void => {
    openConfirm({
      content: '정말로 회원을 탈퇴하시겠습니까?',
      callback: async () => {
        try {
          const result = await controller.memberSignOut(userInfo[0].account);
          // await controller.memberSignOut(userInfo[0].account);
          closeConfirm();
          openAlert({
            type: 'success',
            content: '회원탈퇴가 정상적으로 완료되었습니다'
          });
          setUserInfo([{
            account: '',
            address1: '',
            address2: '',
            address3: '',
            address4: '',
            message: '',
            responseCode: result.data.responseCode,
          }]);
          navigate('/');
        } catch (err:any) {
          if(err.response.data.responseCode !== 200) {
            openAlert({
              type: 'error',
              content: '에러가 발생하였습니다.\r\n새로고침 후 다시 시도해주세요'
            });
            return ;
          }
        }
      },
    });
  }

  // 회원수정 창 열기
  const mermberModifyOpen = ():void => {
    const ModalContent = () => (
      <MyInfoModifyModal onClose={closeModal} userData={userData} setUserData={setUserData}
        profileImage={profileImage} setProfileImage={setProfileImage} />
    );

    openModal({
      size: 'md',
      backDrop: false,
      content: <ModalContent />
    });
  }

  // 비밀번호 변경
  const memberChangePassword = ():void => {
    const ModalContent = () => (
      <MyInfoPasswordChangeModal onClose={closeModal} setCertification={setCertification} />
    );

    openModal({
      size: 'sm',
      backDrop: false,
      content: <ModalContent />
    });
    return ;
  }

  useEffect(() => {
     // 프로필 사진 가져오기
     const userProfileGet = async (account: String) => {
      try {
        // console.log('account ', account);
        const result = await controller.userProfileLoad(account);
        // console.log('result ', result);
        setProfileImage(result.data.data);
      } catch (err:any) {
        // console.log('err ', err);
        if(err.response.data.responseCode === 300) {
          setProfileImage(defaultImg);
        }
        else if (err.response.data.responseCode !== 200) {
          openAlert({
            type: 'error',
            content: '에러가 발생했습니다.\r\n새로고침 후 다시 시도해주세요'
          });
        }
      }
    }

    if(userInfo[0].account !== '') {
      userProfileGet(userInfo[0].account);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

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
        <button type='button' className={style.fullButton} onClick={memberChangePassword}>비밀번호 변경</button>
        <button type='button' className={style.fullButton} onClick={mermberModifyOpen}>정보수정</button>
        <button type='button' className={style.fullButton} onClick={memberSignOut}>탈퇴</button>
      </div>
    </div>
  )
}
