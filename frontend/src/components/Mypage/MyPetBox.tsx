import { useModal } from '../../hooks/useModal';
import { useConfirm } from '../../hooks/useConfirm';
import { useAlert } from '../../hooks/useAlert';
import Controller from '../../api/controller';
import MyPetModifyModal from './MyPetModifyModal';
import defaultImg from '../../assets/matepage/MateDefaultImage.png';
import style from './MyPetBox.module.css';

interface MyPetBoxInterface {
  petData: myPetInfoInterface;
  petList: myPetInfoInterface[];
  setPetList: Function;
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
  animalsPhotos: string;
  animalsRegisData: string;
  animalsModifyDate: string;
  animalsUsersIndexNumber: number;
  animalsInfoActivate: number;
}

export default function MyPetBox(props:MyPetBoxInterface) {
  const { petData, petList, setPetList } = props;
  const { openModal, closeModal } = useModal();
  const { openConfirm, closeConfirm } = useConfirm();
  const { openAlert } = useAlert();
  const controller = new Controller();

  // 반려동물 정보 삭제
  const petDelete = (animalsIndexNumber:number) => {
    openConfirm({
      content: '해당 반려동물 정보를 삭제하시겠습니까?',
      callback: async () => {
        try {
          // const result = await controller.myPetDelete(animalsIndexNumber);
          await controller.myPetDelete(animalsIndexNumber);
          // console.log('result2 ', result);
          closeConfirm();
          openAlert({
            type: 'success',
            content: '해당 정보가 삭제되었습니다'
          });
          const updatePetListData = petList.filter((el:myPetInfoInterface) => el.animalsIndexNumber !== animalsIndexNumber);
          setPetList(updatePetListData);
        } catch (err:any) {
          openAlert({
            type: 'error',
            content: '에러가 발생하였습니다.\r\n새로고침 후 다시 시도해주세요'
          });
          return ;
        }
      },
    });
  }

   // 반려동물 수정 창 열기
   const petModifyOpen = (petData:any) => {
    const ModalContent = () => (
      <MyPetModifyModal onClose={closeModal} petData={petData} petList={petList} setPetList={setPetList} />
    );

    openModal({
      size: 'md',
      backDrop: false,
      content: <ModalContent />
    });
  }

  return (
    <div className={style.wrap}>
      <div className={style.leftWrap}>
        <div className={style.petImageWrap}>
          <img src={petData.animalsPhotos === '' ? defaultImg : petData.animalsPhotos} alt='petImage' />
        </div>
      </div>
      <div className={style.rightWrap}>
        <p>
          <span>이름</span>
          <span>{petData.animalsName}</span>
        </p>
        <p>
          <span>나이</span>
          <span>{petData.animalsAge}세</span>
        </p>
        <p>
          <span>성별</span>
          <span>{petData.animalsGender === 1 ? '수컷' : '암컷'}</span>
        </p>
        <p>
          <span>종류</span>
          <span>{petData.animalsCategory1 === 1 ? '강아지' : petData.animalsCategory1 === 2 ? '고양이' : '기타'}</span>
        </p>
        <p>
          <span>품종</span>
          <span>{petData.animalsCategory2}</span>
        </p>
      </div>
      <div className={style.buttonGroup}>
        <button type='button' className={style.emptyButton} onClick={() => petModifyOpen(petData)} >수정</button>
        <button type='button' className={style.emptyButton} onClick={() => petDelete(petData.animalsIndexNumber)} >삭제</button>
      </div>
    </div>
  )
}
