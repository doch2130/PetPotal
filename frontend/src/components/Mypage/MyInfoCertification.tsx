import { KeyboardEvent, useRef, useState } from 'react'
import { useRecoilState } from 'recoil';
import { UserType, userState } from '../../recoil/user';
import { useAlert } from '../../hooks/useAlert';
import { useModal } from '../../hooks/useModal';
import { useConfirm } from '../../hooks/useConfirm';
import Controller from '../../api/controller';
import MyInfo from './MyInfo';
import style from './MyInfoCertification.module.css';

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

export default function MyInfoCertification() {
  const [ certification, setCertification ] = useState<Boolean>(false);
  const controller = new Controller();
  const { openAlert } = useAlert();
  const { openModal, closeModal } = useModal();
  const { openConfirm, closeConfirm } = useConfirm();
  const password = useRef<HTMLInputElement>(null);
  const [userInfo, setUserInfo] = useRecoilState<UserType[]>(userState);
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
  
  
  // const userInfoGet = async (account:String, password:string) => {
  const userInfoGet = async () => {
    // const result = await controller.userInfoLoad(account, password);
    if(!password.current) {
      return ;
    }

    if(password.current.value === '') {
      openAlert({
        title: '회원정보 비밀번호 미입력',
        type: 'error',
        content: '비밀번호를 입력해주세요.',
      });
      return ;
    }

    try {
      const result = await controller.userInfoLoad(userInfo[0].account, password.current.value);
      if(result.data.responseCode !== 200) {
        openAlert({
          title: '회원정보 로드 실패',
          type: 'error',
          content: '에러가 발생했습니다.\r\n새로고침 후 다시 시도해주세요'
        });
        return ;
      }
      setUserData(result.data.data);
      setCertification(true);
    } catch (err:any) {
      // console.log('err ', err.response.data.responseCode);
      if (err.response.data.responseCode === 500) {
        openAlert({
          title: '회원정보 비밀번호 에러',
          type: 'error',
          content: '비밀번호가 일치하지 않습니다.',
        });
        return ;
      }
    }
  }

  const formEnterEvent = (e:KeyboardEvent<HTMLInputElement>):void => {
    if (e.key === 'Enter') {
      userInfoGet();
    }
    return ;
  }

  return (
    <>
    {!certification ? 
    <div className={style.wrap}>
      <label htmlFor='myPassword'>비밀번호</label>
      <input type='password' id='myPassword' name='password' ref={password} onKeyDown={formEnterEvent}/>
      <button type='button' onClick={userInfoGet}>확인</button>
    </div>
    : <MyInfo userData={userData} setUserData={setUserData} setCertification={setCertification} />
    }
    </>
  )
}
