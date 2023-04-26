import { useForm } from 'react-hook-form';
import MateWriteFormRow from './MateWriteFormRow';
import style from './MateWriteForm.module.css';

interface MateWriteFormInput {
  title: string;
  writeType: string;
  amount: string;
  petName: string;
}

export default function MateWriteForm() {
  const { register, setValue, getValues, formState: { errors }, setError, handleSubmit} = useForm<MateWriteFormInput>({mode: 'onChange'});
  return (
    <form className={style.wrap}>
      <MateWriteFormRow styleWrapRow={style.wrapRow} styleWrapCol={style.wrapCol} id='title' text='제목' >
        <input 
            {...register('title',
            {
              required: {value: true, message: '제목을 입력해주세요'},
            },
            )}
            id='title' type='text' placeholder='제목을 입력해주세요'
          />
          <p className={style.mateWriteWraning}>제목을 입력해주세요</p>
          <p className={style.mateWriteWraning}>{errors.title?.message}</p>
      </MateWriteFormRow>

      <MateWriteFormRow styleWrapRow={style.wrapRow} styleWrapCol={style.wrapCol + ' ' + style.writeType} id='' text='종류' >
        <input 
            {...register("writeType",
            {
              required: {value: true, message: '글 구분을 선택해주세요' }
            },
            )}
            type="radio" id='typeWanted' value="구함"
          />
          <label htmlFor='typeWanted'>구함</label>
          <input 
            {...register("writeType",
            {
              required: {value: true, message: '글 구분을 선택해주세요' }
            },
            )}
            type="radio" id='typeSupport' value="지원"
          />
          <label htmlFor='typeSupport'>지원</label>
          <p className={style.mateWriteWraning}>글 구분을 선택해주세요</p>
          <p className={style.mateWriteWraning}>{errors.writeType?.message}</p>
      </MateWriteFormRow>

      {/* <MateWriteFormRow styleWrapRow={style.wrapRow} styleWrapCol={style.wrapCol + ' ' + style.amount} id='amount' text='금액' >
        <input 
            {...register('amount',
            {
              required: {value: true, message: '금액을 입력해주세요'},
              pattern: {
                value: /[0-9]$/,
                message: '입력한 금액을 다시 확인해주세요'
              },
              min: {
                value: 0,
                message: '0이상의 숫자만 입력 가능합니다.'
              }
            },
            )}
            id='amount' type='number' placeholder='금액을 입력해주세요' min='0'
          />
          <span>원</span>
          <p className={style.mateWriteWraning}>금액을 입력해주세요</p>
          <p className={style.mateWriteWraning}>{errors.amount?.message}</p>
      </MateWriteFormRow> */}


      <div className={style.wrapRow}>
        <div className={style.wrapCol + ' ' + style.amount}>
        <label htmlFor='amount'>금액</label>
          <input 
            {...register('amount',
            {
              required: {value: true, message: '금액을 입력해주세요'},
              pattern: {
                value: /[0-9]$/,
                message: '입력한 금액을 다시 확인해주세요'
              },
              min: {
                value: 0,
                message: '0이상의 숫자만 입력 가능합니다.'
              }
            },
            )}
            id='amount' type='number' placeholder='금액을 입력해주세요' min='0'
          />
          <span>원</span>
          <p className={style.mateWriteWraning}>금액을 입력해주세요</p>
          <p className={style.mateWriteWraning}>{errors.amount?.message}</p>
        </div>
      </div>

      <div className={style.wrapRow + ' ' + style.wrapPet}>
        <div className={style.wrapCol}>
          <h2>반려동물 정보</h2>
        </div>
      </div>

      <div className={style.wrapRow}>
        <div className={style.wrapCol}>
          <label htmlFor='petName'>이름</label>
          <input 
            {...register('petName',
            {
              required: {value: true, message: '이름을 입력해주세요'},
            },
            )}
            id='petName' type='text' placeholder='이름을 입력해주세요'
          />
          <p className={style.mateWriteWraning}>이름을 입력해주세요</p>
          <p className={style.mateWriteWraning}>{errors.petName?.message}</p>
        </div>
      </div>

    </form>
  )
}
