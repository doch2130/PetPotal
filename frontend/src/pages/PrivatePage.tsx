/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect } from 'react'
import { UserType, userState } from '../recoil/user';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../hooks/useAlert';

interface PrivatePageInterface {
  children: React.ReactNode;
}

export default function PrivatePage(props:PrivatePageInterface) {
  const userInfo = useRecoilValue<UserType[]>(userState);
  const { openAlert } = useAlert();
  
  const navigate = useNavigate();

  const authCheck = useCallback(() => {
    if(userInfo[0].account === '') {
      openAlert({
        type: 'error',
        content: '로그인 후 접근할 수 있습니다.',
      });
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    authCheck();
  }, []);

  return (
    <>
    {props.children}
    </>
  )
}
