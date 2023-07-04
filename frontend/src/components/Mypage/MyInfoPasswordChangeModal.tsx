import { MouseEventHandler } from 'react'
import style from './MyInfoPasswordChangeModal.module.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAlert } from '../../hooks/useAlert';
import { useConfirm } from '../../hooks/useConfirm';
import Controller from '../../api/controller';

interface userChangePasswordFormInput {
  currentPassword: String;
  changePassword: String;
  changePasswordCheck: String;
}

interface MyInfoPasswordChangeModalInterface {
  onClose: Function;
  setCertification: Function;
}

export default function MyInfoPasswordChangeModal(props:MyInfoPasswordChangeModalInterface) {
  const { onClose, setCertification } = props;
  const { register, setValue, getValues, formState: { errors }, setError, handleSubmit} = useForm<userChangePasswordFormInput>({mode: 'onChange'});
  const { openAlert } = useAlert();
  const { openConfirm, closeConfirm } = useConfirm();
  const controller = new Controller();

  const onSubmit:SubmitHandler<userChangePasswordFormInput> = async (data):Promise<void> => {
    if(getValues('changePassword') === '') {
      setError('changePassword', {message: '변경할 비밀번호를 입력해주세요'}, {shouldFocus: true});
      return ;
    }
    if(getValues('changePasswordCheck') === '') {
      setError('changePasswordCheck', {message: '변경할 비밀번호를 입력해주세요'}, {shouldFocus: true});
      return ;
    }
    if(getValues('changePassword') !== getValues('changePasswordCheck')) {
      setError('changePasswordCheck', {message: '변경 비밀번호가 일치하지 않습니다'}, {shouldFocus: true});
      return ;
    }
    // console.log('data ', data);

    openConfirm({
      title: '비밀번호 변경 확인',
      content: '해당 비밀번호로 변경하시겠습니까?',
      callback: async () => {
        try {
          // const result = await controller.userChangePassword(data);
          await controller.userChangePassword(data);
          // console.log('result ', result);
          closeConfirm();
          onClose();
          setCertification(false);
          openAlert({
            title: '회원정보 비밀번호 변경 성공',
            type: 'success',
            content: '비밀번호가 변경되었습니다.',
          });
        } catch (err:any) {
          // console.log('err ', err);
          if(err.response.data.responseCode === 403 && err.response.data.data === 2) {
            closeConfirm();
            openAlert({
              title: '회원정보 비밀번호 변경 실패',
              type: 'error',
              content: '현재 비밀번호가 일치하지 않습니다.',
            });
            return ;
          }

          openAlert({
            title: '회원정보 비밀번호 변경 에러',
            type: 'error',
            content: '비밀번호 변경 중 에러가 발생하였습니다.\r\n새로고침 후 다시 시도해주세요.',
          });
          return ;
        }
      }
    });
    return ;
  }

  return (
    <div className={style.wrap}>
      <h2>비밀번호 변경</h2>
      <form className={style.wrapForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.currentPwdWrap}>
          <label htmlFor='currentPassword'>현재 비밀번호</label>
          <input 
            {...register('currentPassword',
              {
                required: {value: true, message: '현재 비밀번호를 입력해주세요'},
              }
            )}
            type='password' defaultValue='' placeholder='현재 비밀번호를 입력하세요' id='currentPassword' />
            <p className={style.warningText}>{errors.currentPassword?.message}</p>
        </div>
        <div className={style.changePwdWrap}>
          <label htmlFor='changePassword'>변경 비밀번호</label>
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
            type='password' defaultValue='' placeholder='변경할 비밀번호를 입력하세요' id='changePassword' />
            <p className={style.warningText}>{errors.changePassword?.message}</p>
        </div>
        <div className={style.currentPwdCheckWrap}>
          <label htmlFor='changePasswordCheck'>변경 비밀번호 확인</label>
          <input 
            {...register('changePasswordCheck',
              {
                required: false,
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/i,
                  message: '대소문자숫자특수기호를 섞어 8자이상을 만들어주세요'
                },
              }
            )}
            type='password' defaultValue='' placeholder='변경할 비밀번호를 다시 입력하세요' id='changePasswordCheck' />
            <p className={style.warningText}>{errors.changePasswordCheck?.message}</p>
        </div>
        <div className={style.buttonWrap}>
          <button type='button' onClick={onClose as MouseEventHandler}>취소</button>
          <button type='submit'>수정</button>
        </div>
      </form>
    </div>
  )
}
