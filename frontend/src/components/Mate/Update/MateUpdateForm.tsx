import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useConfirm } from '../../../hooks/useConfirm';
import { useRecoilValue } from 'recoil';
import { UserType, userState } from '../../../recoil/user';
import { useAlert } from '../../../hooks/useAlert';
import { useModal } from '../../../hooks/useModal';
import Controller from '../../../api/controller';
import MateWritePetAdd from '../Write/MateWritePetAdd';
import MateWriteTextEditorQuil from '../Write/MateWriteTextEditorQuil';
import MateWriteMap from '../Write/MateWriteMap';
import style from './MateUpdateForm.module.css';

interface MateFormDataInterface {
  animalsIndexNumber: number;
  mateBoardIndexNumber: number;
  mateBoardTitle: String;
  mateBoardCategory: number;
  mateBoardFee: Number;
  petName: String;
  petGender: String;
  petAge: String;
  petSpecies: String;
  petBreeds: String;
  petWeight: Number;
  isNeutered: String;
  mateBoardContent1: String;
  mateBoardContent2: String;
  address: String;
  mateBoardAddress1: String;
  mateBoardAddress2: string;
  mateBoardAddress3: string;
  mateBoardAddress4: string;
  mateBoardLng: number;
  mateBoardLat: number;
  Animals: MateFormPetDataInterface;
}

interface MateFormPetDataInterface {
  animalsAge: number;
  animalsCategory1: number;
  animalsCategory2: string;
  animalsGender: number;
  animalsName: string;
  animalsNeutered: number;
  animalsWeight: number;
}

interface MateUpdateFormInterface {
  imgFile: Array<File>;
  MateFormData:MateFormDataInterface;
}

interface MateUpdateFormInput {
  animalsIndexNumber: number;
  mateBoardIndexNumber: number;
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

interface mapDataInterface {
  x: number;
  y: number;
  _lng: number;
  _lat: number;
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

export default function MateUpdateForm(props:MateUpdateFormInterface) {
  const { imgFile, MateFormData } = props;
  const navigate = useNavigate();
  const { register, setValue, watch, getValues, formState: { errors }, setError, handleSubmit} = useForm<MateUpdateFormInput>({mode: 'onChange'});
  // const {getValues, register, handleSubmit, formState: { isSubmitting, errors }} = useForm({mode: 'onChange'});
  const mateBoardCategory = watch("mateBoardCategory");
  const controller = new Controller();
  const { openConfirm, closeConfirm } = useConfirm();
  const { openAlert } = useAlert();
  const { openModal, closeModal } = useModal();
  // const [ userInfo, setUserInfo ] = useRecoilState<UserType[]>(userState);
  const userInfo = useRecoilValue<UserType[]>(userState);
  const [ myPetList, setMyPetList ] = useState<myPetInfoInterface[]>([]);
  const [ mapData, setMapData ] = useState<mapDataInterface>({
    x: MateFormData.mateBoardLng,
    y: MateFormData.mateBoardLat,
    _lng: MateFormData.mateBoardLng,
    _lat: MateFormData.mateBoardLat,
  });
  
  const onSubmit = async (data:MateUpdateFormInput):Promise<void> => {
    console.log('data ', data);
    if(mateBoardCategory === '1') {
      if((getValues('petAge').includes('선택'))) {
        setError('petAge', {message: '나이를 선택해주세요'}, {shouldFocus: true });
        return ;
      }
  
      if((getValues('petSpecies').includes('선택'))) {
        setError('petSpecies', {message: '종류를 선택해주세요'}, {shouldFocus: true });
        return ;
      }
    }

    openConfirm({
      title: '글 수정',
      content: '수정한 내용으로 변경하시겠습니까?',
      callback: async () => {
        closeConfirm();
        const formData = new FormData();
        formData.append("data", JSON.stringify(data));
        imgFile.forEach((el) => {
          formData.append('mateBoardPhotos', el);
        });
        try {
          // const result = await controller.mateWrite(formData);
          await controller.mateBoardUpdatePost(formData);
          openAlert({
            title: 'Mate Board Update Success',
            type: 'success',
            content: '메이트 게시글이 수정되었습니다.'
          });
          navigate('/mate/1');
        } catch (err:any) {
          openAlert({
            title: 'Mate Board Update Error',
            type: 'error',
            content: '업데이트 중 오류가 발생하였습니다.\r\n새로 고침 후 다시 시도해주세요'
          });
        }
      }
    });

    return ;
  }

  const handleSubmitCancle = ():void => {
    openConfirm({
      title: '글 수정 취소',
      content: '글 수정을 취소하시겠습니까?',
      callback: () => {
        closeConfirm();
        navigate(`/mate/detail/${MateFormData.mateBoardIndexNumber}`);
        return ;
      }
    });
  }

  useEffect(():void => {
    const myPetInfoLoad = async () => {
      try {
        const result = await controller.myPetInfoLoad();
        // console.log('result ', result);
        setMyPetList(result.data.data);
        return ;
      } catch (err:any) {
        if(err.response.data.responseCode === 403 && err.response.data.data === false) {
          // console.log('유저 정보 없음');
          openAlert({
            title: '사용자 정보 불러오기 오류',
            type: 'error',
            content: '데이터 로딩 중 에러가 발생하였습니다.\r\n새로고침 후 다시 시도해주세요.',
          });
          return ;
        } else if(err.response.data.responseCode === 304 && err.response.data.data === false) {
          // console.log('펫 정보 없음');
          setMyPetList([]);
          return ;
        }
        openAlert({
          title: '나의 펫 정보 불러오기 오류',
          type: 'error',
          content: '데이터 로딩 중 에러가 발생하였습니다.\r\n새로고침 후 다시 시도해주세요.',
        });
        return ;
      }
    }

    myPetInfoLoad();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myPetList.length]);

  const petAddModal = () => {
    const ModalContent = ():JSX.Element => (
      <MateWritePetAdd onClose={closeModal} myPetList={myPetList} setMyPetList={setMyPetList} />
    );
    openModal({
      backDrop: false,
      content: <ModalContent />
    });
  }

  const myPetInfoSelect = (e:ChangeEvent<HTMLSelectElement>) => {
    if(e.target.value !== '선택') {
      const petFormUpdate = myPetList.filter((el:myPetInfoInterface) => el.animalsIndexNumber === Number(e.target.value));
      setValue('animalsIndexNumber', Number(e.target.value));
      setValue('petName', petFormUpdate[0].animalsName);
      setValue('petGender', petFormUpdate[0].animalsGender.toString());
      setValue('petAge', petFormUpdate[0].animalsAge.toString());
      setValue('petSpecies', petFormUpdate[0].animalsCategory1.toString());
      setValue('petBreeds', petFormUpdate[0].animalsCategory2);
      setValue('petWeight', petFormUpdate[0].animalsWeight);
      setValue('isNeutered', petFormUpdate[0].animalsNeutered.toString());
    } else {
      setValue('animalsIndexNumber', Number(e.target.value));
      setValue('petName', '');
      setValue('petGender', '0');
      setValue('petAge', '선택');
      setValue('petSpecies', '0');
      setValue('petBreeds', '');
      setValue('petWeight', 0);
      setValue('isNeutered', '0');
    }
  }

  useEffect(() => {
    // console.log('MateFormData ', MateFormData);
    setValue('title', MateFormData.mateBoardTitle);
    setValue('mateBoardCategory', MateFormData.mateBoardCategory.toString());
    setValue('amount', MateFormData.mateBoardFee);
    setValue('detailContent', MateFormData.mateBoardContent1);
    setValue('cautionContent', MateFormData.mateBoardContent2);
    setValue('mateBoardIndexNumber', MateFormData.mateBoardIndexNumber);
    if(MateFormData.Animals) {
      setValue('animalsIndexNumber', MateFormData.animalsIndexNumber);
      setValue('petName', MateFormData.Animals.animalsName);
      setValue('petGender', MateFormData.Animals.animalsGender.toString());
      setValue('petAge', MateFormData.Animals.animalsAge.toString());
      setValue('petSpecies', MateFormData.Animals.animalsCategory1.toString());
      setValue('petBreeds', MateFormData.Animals.animalsCategory2);
      setValue('petWeight', MateFormData.Animals.animalsWeight);
      setValue('isNeutered', MateFormData.Animals.animalsNeutered.toString());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                pattern: {
                  value: /^[A-Za-z0-9가-힣][A-Za-z0-9가-힣\s]{0,28}[A-Za-z0-9가-힣]$/,
                  message: '30자 이내 영문, 한글, 숫자만 입력가능합니다.',
                }
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
            <p className={style.mateWriteWraning}>{errors.mateBoardCategory?.message}</p>
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

      {mateBoardCategory === '1' ? <>
        <div className={style.wrapRow + ' ' + style.wrapPet}>
          <div className={style.wrapCol}>
            <h2>반려동물 정보</h2>
            <select id='petInfoLoad' onChange={myPetInfoSelect}>
              <option value="선택">반려동물 정보 가져오기</option>
              {myPetList.map((el:myPetInfoInterface, index:number) => {
                return (
                  <option value={el.animalsIndexNumber} key={index}>{el.animalsName}</option>
                )
              })}
            </select>
            <button type='button' className={style.petAddButton} onClick={petAddModal}>신규 등록</button>
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
                  value: /^[A-Za-z0-9가-힣][A-Za-z0-9가-힣\s]{0,28}[A-Za-z0-9가-힣]$/,
                  message: '30자 이내 영문, 한글, 숫자만 입력가능합니다.',
                }
              },
              )}
              id='petName' type='text' placeholder='이름을 입력해주세요' disabled readOnly
            />
            <p className={style.mateWriteWraning}>{errors.petName?.message}</p>
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
              id='petSpecies' disabled aria-readonly >
              <option value="선택">종류를 선택해주세요</option>
              <option value="1">강아지</option>
              <option value="2">고양이</option>
              <option value="3">기타</option>
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
                pattern: {
                  value: /^[A-Za-z0-9가-힣][A-Za-z0-9가-힣\s]{0,28}[A-Za-z0-9가-힣]$/,
                  message: '30자 이내 영문, 한글, 숫자만 입력가능합니다.',
                }
              },
              )}
              id='petBreeds' type='text' placeholder='품종을 입력해주세요' disabled readOnly
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
              id='petWeight' type='text' placeholder='무게를 입력해주세요'disabled readOnly
            />
            <span>KG</span>
            <p className={style.mateWriteWraning}>{errors.petWeight?.message}</p>
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
            <p className={style.mateWriteWraning}>{errors.isNeutered?.message}</p>
          </div>
        </div>
    </>: null}


        <div className={style.wrapRow + ' ' + style.wrapRowTextEditor}>
          <div className={style.wrapCol}>
            <h2>세부내용</h2>
            <div className={style.wrapTextEditor}>
              <MateWriteTextEditorQuil setValueHandler={setValue} name='detailContent' initialValue={MateFormData?.mateBoardContent1}
              placeholderText='EX)&#13;&#10;날짜 : 2023-04-17&#13;&#10;시간 : 16시 ~ 17시&#13;&#10;주요 내용 :&#13;&#10;안녕하세요. 저희 반려동물 산책해주실 분 구합니다.' />
            </div>
          </div>
        </div>

        <div className={style.wrapRow + ' ' + style.wrapRowTextEditor}>
          <div className={style.wrapCol}>
            <h2>주의사항</h2>
            <div className={style.wrapTextEditor}>
              <MateWriteTextEditorQuil setValueHandler={setValue} name='cautionContent' initialValue={MateFormData?.mateBoardContent2}
              placeholderText='EX)&#13;&#10;입질이 있으며, 심장이 안좋아서 약을 복용하고 있습니다.' />
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
      <div className={style.buttonGroup}>
        <button type='button' onClick={handleSubmitCancle}>취소</button>
        <button type='button' onClick={handleSubmit(onSubmit)}>등록</button>
      </div>
    </>
  )
}
