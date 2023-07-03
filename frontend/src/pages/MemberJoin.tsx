import style from './MemberJoin.module.css';
import Controller from '../api/controller';

import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler} from 'react-hook-form';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../hooks/useAlert';

interface JoinFormInput {
    account: String;
    password: String;
    passwordCheck: String;
    name: String;
    nickName: String;
    email: String;
    phone: String;
    address: String;
    address4: String;
}


export default function MemberJoin() {
  const navigate = useNavigate();
  const { openAlert } = useAlert();
  const { register, setValue, getValues, formState: { errors }, setError, handleSubmit} = useForm<JoinFormInput>({mode: 'onChange'});
  const [duplicateValue, setDuplicateValue] = useState({
    account: false,
    // nickName: false,
    email: false,
    // phone: false,
  })

  const [addressObj, setAddressObj] = useState({
    address1: '',
    address2: '',
    address3: '',
  });

  //Daum Post 관련
  const POSTCODE_URL = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
  const POST_WIDTH = 500;
  const POST_HEIGHT = 500;

  type Value = {sido: string, sigungu: string, zonecode: string, jibunAddress:string, address: string, userSelectedType: string, roadname: string, bname: string}

  const onComplete = (data : Value) => {
    if(data.userSelectedType === 'R') {
      // 도로명 주소
      const fullAddress = `(${data.zonecode}) ${data.address}`;
      setValue('address', fullAddress, { shouldValidate: true, shouldDirty: true });
      // 세종특별자치시처럼 구가 없는 경우가 있음
      setAddressObj({
        address1: data.sido,
        address2: data.sigungu,
        address3: data.sigungu === '' ?
        data.address.slice(data.address.indexOf(data.roadname)) :
        data.address.slice(data.address.indexOf(data.sigungu) + data.sigungu.length + 1),
      });
    } else {
      // 지번 주소
      const fullAddress = `(${data.zonecode}) ${data.jibunAddress}`;
      setValue('address', fullAddress, { shouldValidate: true, shouldDirty: true });
      // 세종특별자치시처럼 구가 없는 경우가 있음
      setAddressObj({
        address1: data.sido,
        address2: data.sigungu,
        address3: data.sigungu === '' ?
        data.jibunAddress.slice(data.jibunAddress.indexOf(data.bname)) : 
        data.jibunAddress.slice(data.jibunAddress.indexOf(data.sigungu) + data.sigungu.length + 1),
      });
    }
  };

  const daumPostCodeopen = useDaumPostcodePopup(POSTCODE_URL);

  const onAddressClickHandle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    daumPostCodeopen({width : POST_WIDTH, height : POST_HEIGHT, onComplete, top: (window.screen.height / 2) - (POST_HEIGHT / 2), left: (window.screen.width / 2) - (POST_WIDTH / 2)});
};
  

  //API Controller 객체 생성
  const controller = new Controller();

  const onSubmit:SubmitHandler<JoinFormInput> = async (data) => {
    if(!duplicateValue.account) {
      setError('account', {message: '중복확인을 해주세요'}, {shouldFocus: true })
    }

    // if(!duplicateValue.nickName) {
    //   setError('nickName', {message: '중복확인을 해주세요'}, {shouldFocus: true })
    // }

    if(!duplicateValue.email) {
      setError('email', {message: '중복확인을 해주세요'}, {shouldFocus: true })
    }
    const apiObj = {...data, ...addressObj};

    const result = await controller.join(apiObj);
    if(result.data.message === '회원가입 완료') {
      // alert(result.data.message);
      openAlert({
        title: '회원가입 성공',
        type: 'success',
        content: result.data.message,
      });
      navigate('/login');
    }
  };

  const duplicateCheck = async(e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { id } = e.target as HTMLButtonElement;
    let apiResult = null;

    switch(id) {
      case 'account':
        // console.log(errors.account?.message);
        if((errors.account?.message !== '중복확인을 해주세요' && errors.account)) {
          return false;
        } else if(!getValues('account')) {
          openAlert({
            title: '중복체크 실패',
            type: 'error',
            content: '값을 입력해주세요'
          });
          return false;
        }
        
        apiResult = await controller.duplicateCheck(id, getValues('account'));
        break;
      case 'email':
        if((errors.email?.message !== '중복확인을 해주세요' && errors.email)) {
          return false;
        } else if(!getValues('email')) {
          openAlert({
            title: '중복체크 실패',
            type: 'error',
            content: '값을 입력해주세요'
          });
          return false;
        }

        apiResult = await controller.duplicateCheck(id, getValues('email'));
        break;
      case 'phone':
        if((errors.phone?.message !== '중복확인을 해주세요' && errors.phone)) {
          return false;
        } else if(!getValues('phone')) {
          openAlert({
            title: '중복체크 실패',
            type: 'error',
            content: '값을 입력해주세요'
          });
          return false;
        }

        apiResult = await controller.duplicateCheck(id, getValues('phone'));
        break;

      case 'nickName':
        if((errors.nickName?.message !== '중복확인을 해주세요' && errors.nickName)) {
          return false;
        } else if(!getValues('nickName')) {
          openAlert({
            title: '중복체크 실패',
            type: 'error',
            content: '값을 입력해주세요'
          });
          return false;
        }

        apiResult = await controller.duplicateCheck(id, getValues('nickName'));
        break;
      default:
        break;
    }
    // console.log(apiResult);
    if(apiResult?.data.data) {
      setDuplicateValue({
        ...duplicateValue,
        [id] : true,
      });

      switch(id) {
        case 'account':
          setError('account', {message: undefined});
          break;
        case 'nickName':
          setError('nickName', {message: undefined});
          break;
        case 'email':
          setError('email', {message: undefined});
          break;
        default:
          break;
      }

      // alert('사용하실 수 있습니다');
      openAlert({
        title: '중복체크 성공',
        type: 'success',
        content: '사용하실 수 있습니다'
      });
    } else {
      // alert('사용할 수 없습니다');
      openAlert({
        title: '중복체크 실패',
        type: 'error',
        content: '사용할 수 없습니다'
      });
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.joinContainer}>
      <h1 className={style.joinTitle}>회원가입</h1>
      <div className={style.joinDivider}>
        <span className={style.requiredTag}>필수입력사항</span>
      </div>
      <div className={style.joinForm}>
        <div className={style.inputColumnWrapper}>
          <label className={style.joinLabel}>아이디</label>
          <div className={style.joinInputWrapper}>
            <input
              {...register('account',
                { 
                  required: {value: true, message: '값을 입력해주세요'},
                  minLength: {value: 3, message: '3글자 ~ 12글자 사이의 값을 입력해주세요'},
                  maxLength: {value: 12, message: '3글자 ~ 12글자 사이의 값을 입력해주세요'},
                  pattern: /^[A-Za-z0-9]*$/i,
                },
              )}
              className={style.joinInput}
              type="text"
              placeholder="아이디를 입력해주세요"
            />
            <p className={style.joinWarning}>{errors.account?.message}</p>
          </div>
          <button className={style.joinButton} id='account' name='account' onClick={duplicateCheck}>중복확인</button>
        </div>

        <div className={style.inputColumnWrapper}>
          <label className={style.joinLabel}>비밀번호</label>
          <div className={style.joinInputWrapper}>
            <input
              {...register('password',
                {
                  required: {value: true, message: '값을 입력해주세요'},
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/i,
                    message: '대소문자숫자특수기호를 섞어 8자이상을 만들어주세요'
                  },
                }
              )}
              className={style.joinInput}
              type="password"
              placeholder="비밀번호를 입력해주세요"
            />
            <p className={style.joinWarning}>{errors.password?.message}</p>
          </div>
          <div className={style.empty}></div>
        </div>

        <div className={style.inputColumnWrapper}>
          <label className={style.joinLabel}>비밀번호확인</label>
          <div className={style.joinInputWrapper}>
            <input
              {...register('passwordCheck',{
                required: {value: true, message: '값을 입력해주세여'},
                validate: (value : String) => value === getValues('password') || '비밀번호가 다릅니다',
              }
              )}
              className={style.joinInput}
              type="password"
              placeholder="비밀번호를 한번 더 입력해주세요"
            />
            <p className={style.joinWarning}>{errors.passwordCheck?.message}</p>
          </div>
          <div className={style.empty}></div>
        </div>

        <div className={style.inputColumnWrapper}>
          <label className={style.joinLabel}>이름</label>
          <div className={style.joinInputWrapper}>
            <input
              {...register('name', 
              {
                required: {value: true, message: '값을 입력해주세요'},
                minLength: {
                  value: 1,
                  message: '1글자 이상 30자 이하로 입력해주세요',
                },
                maxLength: {
                  value: 30,
                  message : '1글자 이상 30자 이하로 입력해주세요',
                }
              })}
              className={style.joinInput}
              type="text"
              placeholder="이름을 입력해주세요"
            />
            <p className={style.joinWarning}>{errors.name?.message}</p>
          </div>
          <div className={style.empty}></div>
        </div>

        <div className={style.inputColumnWrapper}>
          <label className={style.joinLabel}>닉네임</label>
          <div className={style.joinInputWrapper}>
            <input
              {...register('nickName',
              {
                required: {value: true, message: '값을 입력해주세요'},
                minLength: {
                  value: 1,
                  message: '1글자 이상 30자 이하로 입력해주세요',
                },
                maxLength: {
                  value: 30,
                  message : '1글자 이상 30자 이하로 입력해주세요',
                }
              })}
              className={style.joinInput}
              type="text"
              placeholder="닉네임을 입력해주세요"
            />
            <p className={style.joinWarning}>{errors.nickName?.message}</p>
          </div>
          <button className={style.joinButton} id='nickName' onClick={duplicateCheck}>중복확인</button>
        </div>

        <div className={style.inputColumnWrapper}>
          <label className={style.joinLabel}>이메일</label>
          <div className={style.joinInputWrapper}>
            <input
              {...register('email',
                {
                  required: {
                    value: true,
                    message: '값을 입력해주세요',
                  },
                  pattern: {
                    value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                    message: '이메일 형태로 입력해주세요'
                  },
                },
              )}
              className={style.joinInput}
              type="text"
              placeholder="예: petportal@gmail.com"
            />
            <p className={style.joinWarning}>{errors.email?.message}</p>
          </div>
          <button className={style.joinButton} id='email' onClick={duplicateCheck}>중복확인</button>
        </div>

        <div className={style.inputColumnWrapper}>
          <label className={style.joinLabel}>휴대폰</label>
          <div className={style.joinInputWrapper}>
            <input
              {...register('phone',
                {
                  required: {
                    value: true,
                    message: '값을 입력해주세요',
                  },
                  pattern: {
                    value: /^\d{11}$/i,
                    message: '번호 11자리를 입력해주세요'
                  },
                },
              )}
              className={style.joinInput}
              type="text"
              placeholder="슷자만 입력해주세요."
            />
            <p className={style.joinWarning}>{errors.phone?.message}</p>
          </div>
          <div className={style.empty}></div>
        </div>

        <div className={style.inputColumnWrapper}>
          <label className={style.joinLabel}>주소</label>
          <div className={style.joinInputWrapper}>
            <input
              {...register('address',
                {
                  required: {
                    value: true,
                    message: '주소를 입력해주세요',
                  }
                }
              )}
              className={style.joinInput}
              type="text"
              placeholder="주소를 입력해주세요."
              disabled
            />
            <p className={style.joinWarning}>{errors.address?.message}</p>
          </div>
          <button className={style.joinButton} onClick={onAddressClickHandle}>주소검색</button>
        </div>

        <div className={style.inputColumnWrapper}>
          <label className={style.joinLabel}>상세주소</label>
          <div className={style.joinInputWrapper}>
            <input
              {...register('address4',
                {
                  required: true,
                  minLength: 1,
                }
              )}
              className={style.joinInput}
              type="text"
              placeholder="상세주소를 입력해주세요."
            />
            <p className={style.joinWarning}>{errors.address4?.message}</p>
          </div>
          <div className={style.empty}></div>
        </div>

        <div className={style.joinDivider}></div>
        <button className={style.joinSubmitButton} type='submit'>가입하기</button>
      </div>
    </form>
  );
}

