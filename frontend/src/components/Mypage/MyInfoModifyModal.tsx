import { ChangeEvent, MouseEventHandler, useEffect, useState } from 'react'
import style from './MyInfoModifyModal.module.css';
import PictureBox from '../UI/PictureBox';
// import defaultImg from '../../assets/profile/default.png';
import FileUploadButton from '../UI/FileUploadButton';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import Controller from '../../api/controller';
import { useForm, SubmitHandler} from 'react-hook-form';
import { useAlert } from '../../hooks/useAlert';
import { useConfirm } from '../../hooks/useConfirm';

interface userDataInterface {
  account: String;
  name: String;
  nickName: String;
  phone: String;
  email: String;
  address1: String;
  address2: String;
  address3: String;
  address4: String;
}

interface userFormInput extends userDataInterface {
  password: String;
  changePassword: String;
  address: String;
}

interface MyInfoModifyModalInterface {
  onClose: Function;
  setUserData: Function;
  userData: userDataInterface;
  profileImage: string;
  setProfileImage: Function;
}

export default function MyInfoModifyModal(props:MyInfoModifyModalInterface) {
  const { onClose, userData, setUserData, profileImage, setProfileImage } = props;
  const controller = new Controller();
  const { register, setValue, getValues, formState: { errors }, setError, handleSubmit} = useForm<userFormInput>({mode: 'onChange'});
  const { openAlert } = useAlert();
  const { openConfirm, closeConfirm } = useConfirm();
  const duplicateValue = useState({
    isNickName: true,
    nickName: userData.nickName,
  });
  const [ modalProfileImage, setModalProfileImage ] = useState<string>(profileImage);

  // 프로필 이미지 변경
  const imgFileHandler = async (e:ChangeEvent<HTMLInputElement>):Promise<void> => {
    const files:any = e.target.files;

    if(files === null || files.length === 0) {
      return ;
    }
    const formData = new FormData();
    formData.append('usersProfile', files[0]);
    try {
      const result = await controller.userProfileModify(formData);
      // console.log('imgFileHandler result :', result);
      // console.log('imgFileHandler result :', result.data);
      setProfileImage(result.data.data);
      setModalProfileImage(result.data.data);
      return ;
    } catch (err) {
      openAlert({
        title: '프로필 이미지 변경 오류',
        type: 'error',
        content: '프로필 변경 중 오류가 발생하였습니다.\r\n새로고침 후 이용부탁드립니다.',
      });
      return ;
    }
  };

  const duplicateCheckHandler = async(e: React.MouseEvent<HTMLButtonElement>) => {
    if(userData.nickName === getValues('nickName')) {
      openAlert({
        title: '닉네임 중복 검사 실패',
        type: 'error',
        content: '기존과 동일한 닉네임입니다.',
      });
      return ;
    }

    const { id } = e.target as HTMLButtonElement;
    try {
      // const result = await controller.duplicateCheck(id, getValues('nickName'));
      await controller.duplicateCheck(id, getValues('nickName'));
      setError('nickName', {message: ''});
      duplicateValue[0].isNickName = true;
      duplicateValue[0].nickName = getValues('nickName');
      openAlert({
        title: '닉네임 중복 검사 성공',
        type: 'success',
        content: '사용할 수 있는 닉네임입니다',
      });
    } catch (err:any) {
      if(err.response.data.responseCode !== 200) {
        openAlert({
          title: '닉네임 중복 검사 실패',
          type: 'error',
          content: '중복된 닉네임입니다',
        });
        return ;
      }
    }
  }

  //Daum Post 관련
  const POSTCODE_URL = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
  const POST_WIDTH = 500;
  const POST_HEIGHT = 500;

  const daumPostCodeopen = useDaumPostcodePopup(POSTCODE_URL);

  type Value = {sido: string, sigungu: string, zonecode: string, jibunAddress:string, address: string, userSelectedType: string, roadname: string, bname: string}

  const onComplete = (data : Value) => {
    if(data.userSelectedType === 'R') {
      // 도로명 주소
      const fullAddress = `(${data.zonecode}) ${data.address}`;
      setValue('address', fullAddress, { shouldValidate: true, shouldDirty: true });
      setValue('address1', data.sido);
      // 세종특별자치시처럼 구가 없는 경우가 있음
      setValue('address2', data.sigungu);
      if(data.sigungu === '') {
        setValue('address3', data.address.slice(data.address.indexOf(data.roadname)));
      } else {
        setValue('address3', data.address.slice(data.address.indexOf(data.sigungu) + data.sigungu.length + 1));
      }
    } else {
      // 지번 주소
      const fullAddress = `(${data.zonecode}) ${data.jibunAddress}`;
      setValue('address', fullAddress, { shouldValidate: true, shouldDirty: true });
      setValue('address1', data.sido);
      // 세종특별자치시처럼 구가 없는 경우가 있음
      setValue('address2', data.sigungu);
      if(data.sigungu === '') {
        setValue('address3', data.jibunAddress.slice(data.jibunAddress.indexOf(data.bname)));
      } else {
        setValue('address3', data.jibunAddress.slice(data.jibunAddress.indexOf(data.sigungu) + data.sigungu.length + 1));
      }
    }
  };

  const onAddressClickHandle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    daumPostCodeopen({width : POST_WIDTH, height : POST_HEIGHT, onComplete, top: (window.screen.height / 2) - (POST_HEIGHT / 2), left: (window.screen.width / 2) - (POST_WIDTH / 2)});
  };

  const onSubmit:SubmitHandler<userFormInput> = async (data) => {
    // console.log(data);

    if(!duplicateValue[0].isNickName) {
      setError('nickName', {message: '중복확인을 해주세요'}, {shouldFocus: true });
      return ;
    }

    if(duplicateValue[0].nickName !== data.nickName) {
      duplicateValue[0].isNickName = false;
      setError('nickName', {message: '중복확인을 다시 해주세요'}, {shouldFocus: true });
      return ;
    }

    openConfirm({
      title: '회원정보 수정',
      content: '해당 정보로 수정하시겠습니까?',
      callback: async () => {
        try {
          // console.log('data ', data);
          // const result = await controller.userInfoModify(data);
          await controller.userInfoModify(data);
          // console.log('result : ', result);
          closeConfirm();
          openAlert({
            title: '회원정보 수정 성공',
            type: 'success',
            content: '회원정보가 수정되었습니다',
          });

          setUserData({
            account: data.account,
            name: data.name,
            nickName: data.nickName,
            phone: data.phone,
            email: data.email,
            address1: data.address1,
            address2: data.address2,
            address3: data.address3,
            address4: data.address4,
          });
          onClose();
        } catch (err:any) {
          // console.log('err ', err);
          if(err.response.data.responseCode === 403 && err.response.data.data === 3) {
            closeConfirm();
            openAlert({
              title: '회원정보 수정 실패',
              type: 'error',
              content: '현재 비밀번호가 일치하지 않습니다.',
            });
            return ;
          }

          openAlert({
            title: '회원정보 수정 실패',
            type: 'error',
            content: '회원정보 수정에 실패했습니다.\r\n새로고침 후 다시 시도해주세요.',
          });
          return ;
        }
      }
    });
  };

  useEffect(() => {
    // 처음 창 열 때 userData => React hook form에 데이터 설정
    setValue('account', userData.account);
    setValue('name', userData.name);
    setValue('nickName', userData.nickName);
    setValue('phone', userData.phone);
    setValue('email', userData.email);
    const address = userData.address1 + ' ' + userData.address2 + ' ' + userData.address3;
    setValue('address', address);
    setValue('address1', userData.address1);
    setValue('address2', userData.address2);
    setValue('address3', userData.address3);
    setValue('address4', userData.address4);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={style.wrap}>
      <PictureBox width='100px' height='100px'>
        <img src={modalProfileImage} alt='MyInfoModalProfileImage' />
      </PictureBox>
      <div className={style.fileUploadButtonWrap}>
        <FileUploadButton onLoadFileHandler={imgFileHandler} multiple={false} />
      </div>
      <form className={style.wrapForm} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>아이디</label>
          <input {...register('account')} type='text' readOnly disabled />
        </div>
        <div>
          <label>비밀번호</label>
          <input 
            {...register('password',
              {
                required: {value: true, message: '현재 비밀번호를 입력해주세요'},
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/i,
                  message: '현재 비밀번호를 입력해주세요'
                },
              }
            )}
            type='password' defaultValue='' placeholder='현재 비밀번호를 입력하세요' />
          <p className={style.joinWarning}>{errors.password?.message}</p>
        </div>
        {/* <div>
          <label>비밀번호 변경</label>
          <input 
            {...register('changePassword',
              {
                required: false,
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/i,
                  message: '대소문자숫자특수기호를 섞어 8자이상을 만들어주세요'
                },
              }
            )}
            type='password' defaultValue='' placeholder='변경할 비밀번호를 입력하세요' />
          <p className={style.joinWarning}>{errors.changePassword?.message}</p>
        </div> */}
        <div>
          <label>이름</label>
          <input {...register('name')} type='text' readOnly disabled />
          <p className={style.joinWarning}>{errors.name?.message}</p>
        </div>
        <div>
          <label>닉네임</label>
          <input 
            {...register('nickName',
              {
                required: {value: true, message: '닉네임을 입력해주세요'},
                minLength: {
                  value: 1,
                  message: '1글자 이상 30자 이하로 입력해주세요',
                },
                maxLength: {
                  value: 30,
                  message : '1글자 이상 30자 이하로 입력해주세요',
                },
                pattern: {
                  value: /^[A-Za-z0-9가-힣][A-Za-z0-9가-힣\s]{0,28}[A-Za-z0-9가-힣]$/,
                  message: '30자 이내 영문, 한글, 숫자만 입력가능합니다.',
                }
              }
            )}
            type='text' placeholder='닉네임을 입력하세요' className={style.responsiveInput} />
          <button type='button' className={style.emptyButton} id='nickName' onClick={duplicateCheckHandler}>중복확인</button>
          <p className={style.joinWarning}>{errors.nickName?.message}</p>
        </div>
        <div>
          <label>이메일</label>
          <input {...register('email')} type='text' readOnly disabled />
        </div>
        <div>
          <label>휴대폰</label>
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
            type="text" placeholder="슷자만 입력해주세요." />
          <p className={style.joinWarning}>{errors.phone?.message}</p>
        </div>
        <div>
          <label>주소</label>
          <input 
            {...register('address',
              {
                required: {
                  value: true,
                  message: '주소를 입력해주세요',
                }
              }
            )}
            type='text' placeholder='주소를 입력하세요' disabled readOnly className={style.responsiveInput} />
          <button type='button' className={style.emptyButton} onClick={onAddressClickHandle}>주소검색</button>
          <p className={style.joinWarning}>{errors.address?.message}</p>
        </div>
        <div>
          <label>상세주소</label>
          <input 
            {...register('address4',
              {
                required: true,
                minLength: 1,
                pattern: {
                  value: /^[A-Za-z0-9가-힣][A-Za-z0-9가-힣\s]{0,28}[A-Za-z0-9가-힣]$/,
                  message: '30자 이내 영문, 한글, 숫자만 입력가능합니다.',
                }
              }
            )}
            type='text' placeholder='상세주소를 입력하세요' />
          <p className={style.joinWarning}>{errors.address4?.message}</p>
        </div>
        <div className={style.buttonGroup}>
          <button type='button' onClick={onClose as MouseEventHandler}>취소</button>
          <button type='submit'>수정</button>
        </div>
      </form>
    </div>
  )
}
