// import React from 'react'
import style from './LoginPage.module.css';
import naver from '../assets/icon/naver.png';
import google from '../assets/icon/google.png';
import AouthButton from '../components/aouth/AouthButton';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import axios from "axios";

export default function LoginPage() {
  const navigate = useNavigate();
  const loginId = useRef<HTMLInputElement>(null);
  const loginPw = useRef<HTMLInputElement>(null);


  const onSubmit = () => {
    if(loginId.current === null || loginId.current.value === '') {
      alert('아이디를 입력해주세요');
      return false;
    } else if (loginPw.current === null || loginPw.current.value === '') {
      alert('비밀번호를 입력해주세요');
      return false;
    }

    const account = loginId.current.value;
    const password = loginPw.current.value;

    axios({
      method: 'post',
      url: 'http://localhost:3010/api/users/signIn',
      data: {
        account,
        password,
      }
    }).then((res) => {
      console.log('로그인 결과 : ', res.data);
    })
  }

  const onSubmitEnter = (e: React.KeyboardEvent) => {
    if(e.key === 'Enter' || e.keyCode === 13) {
      onSubmit();
    }
  }

  const moveRegister = () => {
    navigate('/memberjoin');
  }

  return (
    <div className={style.wrap}>
      <div className={style.row}>
        <div className={style.col}>
          <form>
            <h2>로그인</h2>
            <div className={style.loginInputWrap}>
              <input type='text' name='id' placeholder='아이디를 입력해주세요' ref={loginId} defaultValue='' onKeyDown={onSubmitEnter} />
            </div>
            <div className={style.loginInputWrap}>
              <input type='password' name='pw' placeholder='비밀번호를 입력해주세요' ref={loginPw} defaultValue='' onKeyDown={onSubmitEnter} />
            </div>
            <div className={style.findAccountWrap}>
              <p>
                <span>아아디 찾기</span>
                <span> | </span>
                <span>비밀번호 찾기</span>
              </p>
            </div>
            <div className={style.loginButtonWrap}>
              <button type='button' className={style.loginButton} onClick={onSubmit}>
                <span>로그인</span>
              </button>
            </div>
            <div className={style.loginButtonWrap}>
              <button type='button' className={style.registerButton} onClick={moveRegister}>
                <span>회원가입</span>
              </button>
            </div>
          </form>

          <hr className={style.loginLine} />

          <div className={style.oauthLoginWrap}>
            {/* <div>
              <button type='button' className={style.naverLoginButton}>
                <img src={naver} alt='Naver AOuth' />
                <div>
                  <span>네이버 로그인</span>
                </div>
              </button>
            </div>
            <div>
              <button type='button' className={style.googleLoginButton}>
                <img src={google} alt='Google AOuth' />
                <div>
                  <span>구글 로그인</span>
                </div>
              </button>
            </div> */}

            {/* test */}
            <AouthButton styleName={style.naverLoginButton} image={naver} imageAlt='Naver AOuth' text='네이버 로그인' />
            <AouthButton styleName={style.googleLoginButton} image={google} imageAlt='Google AOuth' text='구글 로그인' />

          </div>
        </div>
      </div>
    </div>
  )
}
