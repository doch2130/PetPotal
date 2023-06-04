/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect } from 'react'
import { useRecoilValue } from 'recoil';
import { UserType, userState } from '../recoil/user';
import { useNavigate } from 'react-router-dom';

interface RestrictedPageInterface {
  children: React.ReactNode;
}

export default function RestrictedPage(props:RestrictedPageInterface) {
  const userInfo = useRecoilValue<UserType[]>(userState);
  
  const navigate = useNavigate();

  const authCheck = useCallback(() => {
    if(userInfo[0].account !== '') {
      navigate('/');
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
