/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect } from 'react'
import { UserType, userState } from '../recoil/user';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';

interface props {
  children: React.ReactNode;
}

export default function PrivatePage(props:props) {
  const userInfo = useRecoilValue<UserType[]>(userState);
  
  const navigate = useNavigate();

  const authCheck = useCallback(() => {
    if(userInfo[0].account === '') {
      alert('로그인 후 접근할 수 있습니다.');
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
