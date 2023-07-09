import { ChangeEvent } from 'react'
import { UseFormRegister, UseFormSetValue } from 'react-hook-form/dist/types/form';
import { FieldErrors } from 'react-hook-form/dist/types/errors';
import MateQuillTextEditor from '../TextEditor/MateQuillTextEditor';
import MateWriteMap from '../Mate/Common/MateWriteMap'
import style from './MateForm.module.css';

interface MateWriteFormInput {
  animalsIndexNumber: number;
  mateBoardIndexNumber?: number;
  title: String;
  mateBoardCategory: String;
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
  address: String;
  mateBoardAddress1: String;
  mateBoardAddress2: string;
  mateBoardAddress3: string;
  mateBoardAddress4: string;
  mateBoardLng: number;
  mateBoardLat: number;
}

interface myPetInfoInterface {
  animalsIndexNumber: number;
  animalsName: string;
  animalsGender: number;
  animalsAge: number;
  animalsWeight: number;
  animalsIsNeutered: number;
  animalsCategory1: number;
  animalsCategory2: string;
  animalsNeutered: number;
  animalsPhotos: string;
  animalsRegisData: string;
  animalsModifyDate: string;
  animalsUsersIndexNumber: number;
  animalsInfoActivate: number;
}

interface mapDataInterface {
  x: number;
  y: number;
  _lng: number;
  _lat: number;
}

interface MateFormInterface {
  onSubmitHandler: any;
  register: UseFormRegister<MateWriteFormInput>;
  setValue: UseFormSetValue<MateWriteFormInput>;
  errors: FieldErrors<MateWriteFormInput>;
  mateBoardCategory: String;
  myPetInfoSelect: Function;
  myPetList: myPetInfoInterface[];
  petAddModal: Function;
  mapData: mapDataInterface;
  mateBoardContent1?: String;
  mateBoardContent2?: String;
}


export default function MateForm(props:MateFormInterface) {
  const { onSubmitHandler, register, setValue, errors, mateBoardCategory, myPetInfoSelect, myPetList, petAddModal, mapData, mateBoardContent1, mateBoardContent2 } = props;
  return (
    <form className={style.wrap} onSubmit={onSubmitHandler}>
      <div className={style.wrapRow}>
        <div className={style.wrapCol}>
          <label htmlFor='title'>제목</label>
          <input 
            {...register('title',
            {
              required: {value: true, message: '제목을 입력해주세요'},
              pattern: {
                value: /^[A-Za-z0-9가-힣][A-Za-z0-9가-힣\s]{0,28}[A-Za-z0-9가-힣]$/,
                message: '30자 이내 영문, 한글, 숫자만 입력가능합니다.',
              }
            },
            )}
            id='title' type='text' placeholder='제목을 입력해주세요'
          />
          {errors.title && <p className={style.mateWriteWraning}>{errors.title?.message}</p>}
        </div>
      </div>

      <div className={style.wrapRow}>
        <div className={style.wrapCol + ' ' + style.writeType}>
          <label>구분</label>
          <input 
            {...register("mateBoardCategory",
            {
              required: {value: true, message: '글 구분을 선택해주세요' }
            },
            )}
            type="radio" id='typeWanted' value="1"
          />
          <label htmlFor='typeWanted'>구함</label>
          <input 
            {...register("mateBoardCategory",
            {
              required: {value: true, message: '글 구분을 선택해주세요' }
            },
            )}
            type="radio" id='typeSupport' value="2"
          />
          <label htmlFor='typeSupport'>지원</label>
          {errors.mateBoardCategory && <p className={style.mateWriteWraning}>{errors.mateBoardCategory?.message}</p>}
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
          {errors.amount && <p className={style.mateWriteWraning}>{errors.amount?.message}</p>}
        </div>
      </div>

    {mateBoardCategory === '1' ? <>
      <div className={style.wrapRow + ' ' + style.wrapPet}>
        <div className={style.wrapCol}>
          <h2>반려동물 정보</h2>
          <select id='petInfoLoad' onChange={(e:ChangeEvent<HTMLSelectElement>) => myPetInfoSelect(e)}>
            <option value="선택">반려동물 정보 가져오기</option>
            {myPetList.map((el:myPetInfoInterface, index:number) => {
              return (
                <option value={el.animalsIndexNumber} key={index}>{el.animalsName}</option>
              )
            })}
          </select>
          <button type='button' className={style.petAddButton} onClick={() => petAddModal()}>신규 등록</button>
        </div>
      </div>

      <div className={style.wrapRow}>
        <div className={style.wrapCol}>
          <label htmlFor='petName'>이름</label>
          <input 
            {...register('petName',
            {
              required: {value: true, message: '이름을 입력해주세요'},
              pattern: {
                value: /^[A-Za-z0-9가-힣][A-Za-z0-9가-힣\s]{0,19}$/,
                message: '20자 이내 영문, 한글, 숫자만 입력가능합니다.',
              }
            },
            )}
            id='petName' type='text' placeholder='이름을 입력해주세요' disabled readOnly
          />
          {errors.petName?.message && <p className={style.mateWriteWraning}>{errors.petName?.message}</p>}
        </div>
      </div>

      <div className={style.wrapRow}>
        <div className={style.wrapCol + ' ' + style.wrapPetGender}>
          <label>성별</label>
          <input 
            {...register("petGender")}
            type="radio" id='petGenderMan' value="1" disabled readOnly
          />
          <label htmlFor='petGenderMan'>수컷</label>
          <input 
            {...register("petGender")}
            type="radio" id='petGenderWoman' value="2" disabled readOnly
          />
          <label htmlFor='petGenderWoman'>암컷</label>
          {errors.petGender?.message && <p className={style.mateWriteWraning}>{errors.petGender?.message}</p>}
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
            id='petAge' disabled aria-readonly >
            <option value="선택">나이를 선택해주세요</option>
            <option value="0">알수없음</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
          {errors.petAge?.message && <p className={style.mateWriteWraning}>{errors.petAge?.message}</p>}
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
            id='petSpecies' disabled aria-readonly >
            <option value="선택">종류를 선택해주세요</option>
            <option value="1">강아지</option>
            <option value="2">고양이</option>
            <option value="3">기타</option>
          </select>
          {errors.petSpecies?.message && <p className={style.mateWriteWraning}>{errors.petSpecies?.message}</p>}
        </div>
      </div>

      <div className={style.wrapRow}>
        <div className={style.wrapCol}>
          <label htmlFor='petBreeds'>품종</label>
          <input 
            {...register('petBreeds',
            {
              required: {value: true, message: '품종을 입력해주세요'},
              pattern: {
                value: /^[A-Za-z0-9가-힣][A-Za-z0-9가-힣\s]{0,29}$/,
                message: '30자 이내 영문, 한글, 숫자만 입력가능합니다.',
              }
            },
            )}
            id='petBreeds' type='text' placeholder='품종을 입력해주세요' disabled readOnly
          />
          {errors.petBreeds?.message && <p className={style.mateWriteWraning}>{errors.petBreeds?.message}</p>}
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
            id='petWeight' type='text' placeholder='무게를 입력해주세요'disabled readOnly
          />
          <span>kg</span>
          {errors.petWeight?.message && <p className={style.mateWriteWraning}>{errors.petWeight?.message}</p>}
        </div>
      </div>

      <div className={style.wrapRow}>
        <div className={style.wrapCol + ' ' + style.wrapIsNeutered}>
          <label>중성화</label>
          <input 
            {...register("isNeutered")}
            type="radio" id='isNeuteredTrue' value="1" disabled readOnly
          />
          <label htmlFor='isNeuteredTrue'>예</label>
          <input 
            {...register("isNeutered")}
            type="radio" id='isNeuteredFalse' value="2" disabled readOnly
          />
          <label htmlFor='isNeuteredFalse'>아니오</label>
          <input 
            {...register("isNeutered")}
            type="radio" id='isNeuteredUnknown' value="3" disabled readOnly
          />
          <label htmlFor='isNeuteredUnknown'>모름</label>
          {errors.isNeutered?.message && <p className={style.mateWriteWraning}>{errors.isNeutered?.message}</p>}
        </div>
      </div>
  </>: null}


      <div className={style.wrapRow + ' ' + style.wrapRowTextEditor}>
        <div className={style.wrapCol}>
          <h2>세부내용</h2>
          <div className={style.wrapTextEditor}>
            <MateQuillTextEditor setValueHandler={setValue} name='detailContent' initialValue={mateBoardContent1 || ''}
            placeholderText='EX)&#13;&#10;날짜 : 2023-04-17&#13;&#10;시간 : 16시 ~ 17시&#13;&#10;주요 내용 :&#13;&#10;안녕하세요. 저희 반려동물 산책해주실 분 구합니다.' />
          </div>
        </div>
      </div>

      <div className={style.wrapRow + ' ' + style.wrapRowTextEditor}>
        <div className={style.wrapCol}>
          <h2>주의사항</h2>
          <div className={style.wrapTextEditor}>
            <MateQuillTextEditor setValueHandler={setValue} name='detailContent' initialValue={mateBoardContent2 || ''}
            placeholderText='EX)&#13;&#10;입질이 있으며, 심장이 안좋아서 약을 복용하고 있습니다.'/>
          </div>
        </div>
      </div>

      <div className={style.wrapRow + ' ' + style.wrapRowMap}>
        <div className={style.wrapCol}>
          <h2>상세 위치</h2>
          <div>
            {mapData.x !== 0 ?
            <MateWriteMap height='300px' mapData={mapData} setValueHandler={setValue} />
            :
            <div>로딩 중입니다</div>
          }
          </div>
        </div>
      </div>
    </form>
  )
}
