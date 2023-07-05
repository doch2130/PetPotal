import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useRef } from 'react';
import { useRecoilState } from "recoil";
import { UserType, userState } from '../recoil/user';
import Controller from '../api/controller';
import naver from '../assets/icon/naver.png';
import google from '../assets/icon/google.png';
import AouthButton from '../components/Aouth/AouthButton';
import style from './LoginPage.module.css';
import { useAlert } from '../hooks/useAlert';


export default function LoginPage() {
  const navigate = useNavigate();
  const loginId = useRef<HTMLInputElement>(null);
  const loginPw = useRef<HTMLInputElement>(null);
  const controller = new Controller();
  const { openAlert } = useAlert();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userInfo, setUserInfo] = useRecoilState<UserType[]>(userState);

  const onSubmit = useCallback(async ():Promise<boolean> => {
    if(loginId.current === null || loginId.current.value === '') {
      // alert('아이디를 입력해주세요');
      openAlert({
        title: '로그인 실패',
        type: 'error',
        content: '아이디를 입력해주세요'
      });
      return false;
    } else if (loginPw.current === null || loginPw.current.value === '') {
      // alert('비밀번호를 입력해주세요');
      openAlert({
        title: '로그인 실패',
        type: 'error',
        content: '비밀번호를 입력해주세요'
      });
      return false;
    }

    const account = loginId.current.value;
    const password = loginPw.current.value;

    const data = {
      account,
      password
    }

    try {
      const result = await controller.login(data);
      // console.log('result : ', result);
      // console.log('userInfo : ', userInfo);

      const updataData = [
        {
          account: result.data.data.account,
          address1: result.data.data.address1,
          address2: result.data.data.address2,
          address3: result.data.data.address3,
          address4: result.data.data.address4,
          message: result.data.message,
          responseCode: result.data.responseCode,
        }
      ];

      setUserInfo(updataData);

      navigate('/');
      return true;

    } catch (err) {
      openAlert({
        title: '로그인 실패',
        type: 'error',
        content: '로그인 정보가 일치하지 않습니다'
      });
      return false;
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmitEnter = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>):void => {
    // if(e.key === 'Enter' || e.keyCode === 13) {
    if(e.key === 'Enter') {
      onSubmit();
    }
  }, [onSubmit]);

  const moveRegister = useCallback(():void => {
    navigate('/memberjoin');
  }, [navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const preparingFunction = ():void => {
    openAlert({
      title: '기능 준비 중',
      type: 'error',
      content: '서비스 준비 중입니다.'
    });
    return ;
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
                <span onClick={preparingFunction}>아아디 찾기</span>
                <span> | </span>
                <span onClick={preparingFunction}>비밀번호 찾기</span>
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

          {/* 네이버, 구글 로그인 미사용으로 인한 display none 설정 */}
          <hr className={style.loginLine} />
          <div className={style.oauthLoginWrap}>
            <AouthButton styleName={style.naverLoginButton} image={naver} imageAlt='Naver AOuth' text='네이버 로그인' />
            <AouthButton styleName={style.googleLoginButton} image={google} imageAlt='Google AOuth' text='구글 로그인' />
          </div>
        </div>
      </div>
    </div>
  )
}
