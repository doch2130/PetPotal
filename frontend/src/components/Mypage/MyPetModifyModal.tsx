import { ChangeEvent, MouseEventHandler, useEffect, useState } from 'react'
import style from './MyPetAddModal.module.css';
import PictureBox from '../UI/PictureBox';
import FileUploadButton from '../UI/FileUploadButton';
import defaultImg from '../../assets/icon/animal.png';
import { useForm, SubmitHandler} from 'react-hook-form';
import { useAlert } from '../../hooks/useAlert';
import { useConfirm } from '../../hooks/useConfirm';
import Controller from '../../api/controller';

interface props {
  onClose: Function;
  petData: any;
}

interface perFormInput {
  animalsName: string;
  animalsAge: string;
  animalsGender: string;
  animalsNeutered: string;
  animalsWeight: string;
  animalsCategory1: string;
  animalsCategory2: string;
  animalsPhotos: string;
}

export default function MyPetAddModal(props:props) {
  const { onClose, petData } = props;
  const { register, setValue, getValues, formState: { errors }, setError, handleSubmit} = useForm<perFormInput>({mode: 'onChange'});
  const { openAlert } = useAlert();
  const { openConfirm, closeConfirm } = useConfirm();
  const controller = new Controller();
  const [ petImage, setPetImage ] = useState<string>(petData.animalsPhotos);
  const [ tempPetImage, setTempPetImage ] = useState<string>('');

  const imgFileHandler = async (e:ChangeEvent<HTMLInputElement>):Promise<void> => {
    const files:any = e.target.files;

    if(files === null || files.length === 0) {
      return ;
    }

    if(tempPetImage !== '') {
      URL.revokeObjectURL(tempPetImage);
      setTempPetImage('');
    }

    const currentImgUrl = URL.createObjectURL(files[0]);
    setTempPetImage(currentImgUrl);
    setValue('animalsPhotos', files[0]);
  };

  const onSubmit : SubmitHandler<perFormInput> = async (data) => {
    console.log('data : ', data);
  }

  useEffect(() => {
    // select, radio 함수 초기 값 셋팅
    setValue('animalsGender', petData.animalsGender);
    setValue('animalsAge', petData.animalsAge);
    setValue('animalsCategory1', petData.animalsCategory1);
    setValue('animalsNeutered', petData.animalsNeutered);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {

    return () => {
      URL.revokeObjectURL(tempPetImage);
    }
  }, [tempPetImage]);

  return (
    <div className={style.wrap}>
      <PictureBox width='125px' height='125px' >
        <img src={tempPetImage === '' ? petImage : tempPetImage} alt='petImage' />
      </PictureBox>
      <FileUploadButton onLoadFileHandler={imgFileHandler} multiple={false} />
      <form className={style.wrapForm} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>이름</label>
          <input
          {...register('animalsName', 
            {
              required: {value: true, message: '이름을 입력해주세요'},
              minLength: {
                value: 1,
                message: '1글자 이상 30자 이하로 입력해주세요',
              },
              maxLength: {
                value: 30,
                message : '1글자 이상 30자 이하로 입력해주세요',
              }
            }
          )}
          type='text' defaultValue={petData.animalsName} placeholder='반려동물 이름을 입력하세요' />
          <p className={style.petAddWarning}>{errors.animalsName?.message}</p>
        </div>
        <div className={style.myPetGender}>
          <label>성별</label>
          <input
          {...register('animalsGender', 
            {
              required: {value: true, message: '성별을 입력해주세요'},
            }
          )}
          type="radio" id='petGenderMan' value="수컷" name='animalsGender' />
          <label htmlFor='petGenderMan'>수컷</label>
          <input
          {...register('animalsGender', 
            {
              required: {value: true, message: '성별을 선택해주세요'},
            }
          )}
          type="radio" id='petGenderWoman' value="암컷" name='animalsGender' />
          <label htmlFor='petGenderWoman'>암컷</label>
          <p className={style.petAddWarning}>{errors.animalsGender?.message}</p>
        </div>
        <div className={style.myPetAge}>
          <label htmlFor='petAge'>나이</label>
          <select
          {...register('animalsAge', 
            {
              required: {value: true, message: '나이를 선택해주세요'},
            }
          )}
          id='petAge' name='animalsAge'>
            <option defaultValue="선택">나이를 선택해주세요</option>
            <option defaultValue="0">알수없음</option>
            <option defaultValue="1">1</option>
            <option defaultValue="2">2</option>
            <option defaultValue="3">3</option>
            <option defaultValue="4">4</option>
            <option defaultValue="5">5</option>
            <option defaultValue="6">6</option>
            <option defaultValue="7">7</option>
            <option defaultValue="8">8</option>
            <option defaultValue="9">9</option>
            <option defaultValue="10">10</option>
          </select>
          <p className={style.petAddWarning}>{errors.animalsAge?.message}</p>
        </div>
        <div className={style.petSpecies}>
          <label htmlFor='petSpecies'>종류</label>
          <select
          {...register('animalsCategory1', 
            {
              required: {value: true, message: '종류를 선택해주세요'},
            }
          )}
          id='petSpecies' name='animalsCategory1'>
            <option defaultValue="선택">종류를 선택해주세요</option>
            <option defaultValue="강아지">강아지</option>
            <option defaultValue="고양이">고양이</option>
            <option defaultValue="기타">기타</option>
          </select>
          <p className={style.petAddWarning}>{errors.animalsCategory1?.message}</p>
        </div>
        <div>
          <label>품종</label>
          <input
          {...register('animalsCategory2', 
            {
              required: {value: true, message: '품종을 입력해주세요'},
              minLength: {
                value: 1,
                message: '1글자 이상 30자 이하로 입력해주세요',
              },
              maxLength: {
                value: 50,
                message : '1글자 이상 50자 이하로 입력해주세요',
              }
            }
          )}
          type='text' defaultValue={petData.animalsCategory2} placeholder='반려동물 품종을 입력하세요' />
          <p className={style.petAddWarning}>{errors.animalsCategory2?.message}</p>
        </div>
        <div className={style.myPetWeight}>
          <label htmlFor='petWeight'>무게</label>
          <input 
          {...register('animalsWeight',
            {
              required: {value: true, message: '무게를 입력해주세요'},
              pattern: {
                value: /^[0-9]{1,5}[.]{0,1}[0-9]{0,1}$/,
                message: '입력한 무게를 다시 확인해주세요'
              },
              min: {
                value: 0,
                message: '0이상의 숫자만 입력 가능합니다.'
              }
            },
          )}
          id='petWeight' type='text' placeholder='무게를 입력해주세요' defaultValue={petData.animalsWeight} />
          <span>KG</span>
          <p className={style.petAddWarning}>{errors.animalsWeight?.message}</p>
        </div>
        <div className={style.myPetIsNeutered}>
          <label>중성화</label>
          <input 
            {...register("animalsNeutered",
            {
              required: {value: true, message: '중성화 여부를 선택해주세요' }
            },
            )}
            type="radio" id='isNeuteredTrue' value="예"
          />
          <label htmlFor='isNeuteredTrue'>예</label>
          <input 
            {...register("animalsNeutered",
            {
              required: {value: true, message: '중성화 여부를 선택해주세요' }
            },
            )}
            type="radio" id='isNeuteredFalse' value="아니오"
          />
          <label htmlFor='isNeuteredFalse'>아니오</label>
          <input 
            {...register("animalsNeutered",
            {
              required: {value: true, message: '중성화 여부를 선택해주세요' }
            },
            )}
            type="radio" id='isNeuteredUnknown' value="모름"
          />
          <label htmlFor='isNeuteredUnknown'>모름</label>
          <p className={style.petAddWarning}>{errors.animalsNeutered?.message}</p>
        </div>
        <div className={style.buttonGroup}>
          <button type='button' onClick={onClose as MouseEventHandler}>취소</button>
          <button type='button' onClick={handleSubmit(onSubmit)}>수정</button>
        </div>
      </form>
    </div>
  )
}
