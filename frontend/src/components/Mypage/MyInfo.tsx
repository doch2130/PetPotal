/* eslint-disable @typescript-eslint/no-unused-vars */
import defaultImg from '../../assets/icon/people.png';
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
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();
  const { openAlert } = useAlert();
  const { openConfirm } = useConfirm();
  const [userInfo, setUserInfo] = useRecoilState<UserType[]>(userState);
  const controller = new Controller();
  const [userData, setUserData] = useState<userData>({
    account: '',
    name: '',
    nickName: '',
    phone: '',
    email: '',
    address: '',
    address4: '',
  });

  // 회원탈퇴
  const memberWithdrawal = () => {
    openConfirm({
      title: '회원탈퇴',
      content: '정말로 회원을 탈퇴하시겠습니까?',
      callback: async () => {
        openAlert({
          title: '회원탈퇴 실패',
          content: '에러가 발생하였습니다. 새로고침 후 다시 시도해주세요'
        });
        const result = await controller.withdrawal();
        if(result.data.statusCode !== 200) {
          openAlert({
            title: '회원탈퇴 실패',
            content: '에러가 발생하였습니다. 새로고침 후 다시 시도해주세요'
          });
          return ;
        }

        openAlert({
          title: '회원탈퇴 성공',
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
      <MyInfoModifyModal onClose={closeModal} userData={userData} setUserData={setUserData} />
    );

    openModal({
      title: "회원정보 수정",
      content: <ModalContent />
    });
  }

  // 회원정보 불러오기
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const userInfoGet = useCallback(async () => {
    const result = await controller.mypageUserInfoGet();
    result.data.address = result.data.address1 + ' ' + result.data.address2 + ' ' + result.data.address3;
    setUserData(result.data);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 회원정보 불러오기
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
        <button type='button' className={style.fullButton} onClick={mermberModifyOpen}>수정</button>
        <button type='button' className={style.fullButton} onClick={memberWithdrawal}>탈퇴</button>
      </div>
    </div>
  )
}
