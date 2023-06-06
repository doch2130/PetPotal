import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useConfirm } from '../../../hooks/useConfirm';
import Controller from '../../../api/controller';
import MateWriteTextEditorQuil from './MateWriteTextEditorQuil';
import MateWriteMap from './MateWriteMap';
import style from './MateWriteForm.module.css';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { UserType, userState } from '../../../recoil/user';

interface propsData {
  imgFile: Array<File>;
}

interface MateWriteFormInput {
  title: String;
  writeType: String;
  amount: Number;
  petName: String;
  petGender: String;
  petAge: String;
  petSpecies: String;
  petBreeds: String;
  petWeight: Number;
  isNeutered: String;
  detailContent: String;
  cautionContent: String;
}

interface mapData {
  x: number;
  y: number;
  _lng: number;
  _lat: number;
}

export default function MateWriteForm(props:propsData) {
  const { imgFile } = props;
  const navigate = useNavigate();
  const { register, setValue, watch, getValues, formState: { errors }, setError, handleSubmit} = useForm<MateWriteFormInput>({mode: 'onChange'});
  // const {getValues, register, handleSubmit, formState: { isSubmitting, errors }} = useForm({mode: 'onChange'});
  const wrtieType = watch("writeType");
  const controller = new Controller();
  const { openConfirm, closeConfirm } = useConfirm();
  const [ userInfo, setUserInfo ] = useRecoilState<UserType[]>(userState);
  const [ mapData, setMapData ] = useState<mapData>({
    x: 0,
    y: 0,
    _lng: 0,
    _lat: 0,
  });

  const onSubmit = async (data:MateWriteFormInput) => {
    // console.log('data : ', data);
    if(wrtieType === '구함') {
      if((getValues('petAge').includes('선택'))) {
        setError('petAge', {message: '나이를 선택해주세요'}, {shouldFocus: true });
        return ;
      }
  
      if((getValues('petSpecies').includes('선택'))) {
        setError('petSpecies', {message: '종류를 선택해주세요'}, {shouldFocus: true });
        return ;
      }
    }

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    imgFile.forEach((el) => {
      formData.append('mateBoardPhotos', el);
    });

    openConfirm({
      title: '글 작성 등록',
      content: '작성한 내용으로 등록하시겠습니까?',
      callback: async () => {
        closeConfirm();
        const result = await controller.mateWrite(formData);
        console.log('result : ', result);
      }
    });

    return ;
  }

  const handleSubmitCancle = () => {
    openConfirm({
      title: '글 작성 취소',
      content: '글 작성을 취소하시겠습니까?',
      callback: () => {
        closeConfirm();
        navigate('/mate');
      }
    });
  }

  useEffect(() => {
    const mapGeocoding = async () => {
      const address = (userInfo[0].address1 + ' ' + userInfo[0].address2 + ' ' + userInfo[0].address3 + ' ' + userInfo[0].address4).trim();
      // console.log('address ', address);
      if (address !== '') {
        const result = await controller.naverMapGeocoding(address);
        // console.log('result ', result.data);
        // console.log('result ', result.data[0]);
        // console.log('result ', result.data[1]);
        setMapData({
          x: result.data[0],
          y: result.data[1],
          _lng: result.data[0],
          _lat: result.data[1],
        });
      }
    }

    mapGeocoding();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  return (
    <>
      <form className={style.wrap} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.wrapRow}>
          <div className={style.wrapCol}>
            <label htmlFor='title'>제목</label>
            <input 
              {...register('title',
              {
                required: {value: true, message: '제목을 입력해주세요'},
              },
              )}
              id='title' type='text' placeholder='제목을 입력해주세요'
            />
            <p className={style.mateWriteWraning}>{errors.title?.message}</p>
          </div>
        </div>

        <div className={style.wrapRow}>
          <div className={style.wrapCol + ' ' + style.writeType}>
            <label>구분</label>
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
            <p className={style.mateWriteWraning}>{errors.writeType?.message}</p>
          </div>
        </div>

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
            <p className={style.mateWriteWraning}>{errors.amount?.message}</p>
          </div>
        </div>

      {wrtieType === '구함' ? <>
        <div className={style.wrapRow + ' ' + style.wrapPet}>
          <div className={style.wrapCol}>
            <h2>반려동물 정보</h2>
            <select id='petInfoLoad'>
              <option defaultValue="선택">반려동물 정보 가져오기</option>
              <option defaultValue="1">1</option>
              <option defaultValue="2">2</option>
              <option defaultValue="3">3</option>
            </select>
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
            <p className={style.mateWriteWraning}>{errors.petName?.message}</p>
          </div>
        </div>

        <div className={style.wrapRow}>
          <div className={style.wrapCol + ' ' + style.wrapPetGender}>
            <label>성별</label>
            <input 
              {...register("petGender",
              {
                required: {value: true, message: '성별을 선택해주세요' }
              },
              )}
              type="radio" id='petGenderMan' value="수컷"
            />
            <label htmlFor='petGenderMan'>수컷</label>
            <input 
              {...register("petGender",
              {
                required: {value: true, message: '성별을 선택해주세요' }
              },
              )}
              type="radio" id='petGenderWoman' value="암컷"
            />
            <label htmlFor='petGenderWoman'>암컷</label>
            <p className={style.mateWriteWraning}>{errors.petGender?.message}</p>
          </div>
        </div>

        <div className={style.wrapRow}>
          <div className={style.wrapCol}>
            <label htmlFor='petAge'>나이</label>
            <select
              {...register("petAge",
              { required: {value: true, message: '나이를 선택해주세요'}
              },
              )}
              id='petAge'>
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
            <p className={style.mateWriteWraning}>{errors.petAge?.message}</p>
          </div>
        </div>

        <div className={style.wrapRow}>
          <div className={style.wrapCol}>
            <label htmlFor='petSpecies'>종류</label>
            <select
              {...register("petSpecies",
              { required: {value: true, message: '종류를 선택해주세요'}
              },
              )}
              id='petSpecies'>
              <option defaultValue="선택">종류를 선택해주세요</option>
              <option defaultValue="강아지">강아지</option>
              <option defaultValue="고양이">고양이</option>
              <option defaultValue="기타">기타</option>
            </select>
            <p className={style.mateWriteWraning}>{errors.petSpecies?.message}</p>
          </div>
        </div>

        <div className={style.wrapRow}>
          <div className={style.wrapCol}>
            <label htmlFor='petBreeds'>품종</label>
            <input 
              {...register('petBreeds',
              {
                required: {value: true, message: '품종을 입력해주세요'},
              },
              )}
              id='petBreeds' type='text' placeholder='품종을 입력해주세요'
            />
            <p className={style.mateWriteWraning}>{errors.petBreeds?.message}</p>
          </div>
        </div>

        <div className={style.wrapRow}>
          <div className={style.wrapCol + ' ' + style.wrapPetWeight}>
            <label htmlFor='petWeight'>무게</label>
            <input 
              {...register('petWeight',
              {
                required: {value: true, message: '무게를 입력해주세요'},
                pattern: {
                  value: /^[0-9]{1,5}[.]{0,1}[0-9]{0,5}$/,
                  message: '입력한 무게를 다시 확인해주세요'
                },
                min: {
                  value: 0,
                  message: '0이상의 숫자만 입력 가능합니다.'
                }
              },
              )}
              id='petWeight' type='text' placeholder='무게를 입력해주세요'
            />
            <span>KG</span>
            <p className={style.mateWriteWraning}>{errors.petWeight?.message}</p>
          </div>
        </div>

        <div className={style.wrapRow}>
          <div className={style.wrapCol + ' ' + style.wrapIsNeutered}>
            <label>중성화</label>
            <input 
              {...register("isNeutered",
              {
                required: {value: true, message: '중성화 여부를 선택해주세요' }
              },
              )}
              type="radio" id='isNeuteredTrue' value="예"
            />
            <label htmlFor='isNeuteredTrue'>예</label>
            <input 
              {...register("isNeutered",
              {
                required: {value: true, message: '중성화 여부를 선택해주세요' }
              },
              )}
              type="radio" id='isNeuteredFalse' value="아니오"
            />
            <label htmlFor='isNeuteredFalse'>아니오</label>
            <input 
              {...register("isNeutered",
              {
                required: {value: true, message: '중성화 여부를 선택해주세요' }
              },
              )}
              type="radio" id='isNeuteredUnknown' value="모름"
            />
            <label htmlFor='isNeuteredUnknown'>모름</label>
            <p className={style.mateWriteWraning}>{errors.isNeutered?.message}</p>
          </div>
        </div>
    </>: null}


        <div className={style.wrapRow + ' ' + style.wrapRowTextEditor}>
          <div className={style.wrapCol}>
            <h2>세부내용</h2>
            <div className={style.wrapTextEditor}>
              <MateWriteTextEditorQuil setValueHandler={setValue} name='detailContent' placeholderText='EX)&#13;&#10;날짜 : 2023-04-17&#13;&#10;시간 : 16시 ~ 17시&#13;&#10;주요 내용 :&#13;&#10;안녕하세요. 저희 반려동물 산책해주실 분 구합니다.' />
            </div>
          </div>
        </div>

        <div className={style.wrapRow + ' ' + style.wrapRowTextEditor}>
          <div className={style.wrapCol}>
            <h2>주의사항</h2>
            <div className={style.wrapTextEditor}>
              <MateWriteTextEditorQuil setValueHandler={setValue} name='cautionContent' placeholderText='EX)&#13;&#10;입질이 있으며, 심장이 안좋아서 약을 복용하고 있습니다.' />
            </div>
          </div>
        </div>

        <div className={style.wrapRow + ' ' + style.wrapRowMap}>
          <div className={style.wrapCol}>
            <h2>상세 위치</h2>
            <div>
              {mapData.x !== 0 ?
              <MateWriteMap height='300px' mapData={mapData}/>
              :
              <div>로딩 중입니다</div>
            }
            </div>
          </div>
        </div>

      </form>
      <div className={style.buttonGroup}>
        <button type='button' onClick={handleSubmitCancle}>취소</button>
        <button type='button' onClick={handleSubmit(onSubmit)}>등록</button>
      </div>
    </>
  )
}
