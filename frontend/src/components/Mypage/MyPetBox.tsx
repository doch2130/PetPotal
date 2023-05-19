import style from './MyPetBox.module.css';
import defaultImg from '../../assets/mainpage/Hoteling/MainPage_Hoteling_Img_2.jpg';
import { useConfirm } from '../../hooks/useConfirm';
import { useAlert } from '../../hooks/useAlert';
import Controller from '../../api/controller';
import MyPetModifyModal from './MyPetModifyModal';
import { useModal } from '../../hooks/useModal';

export default function MyPetBox(props:any) {
  const { petData } = props;
  const { openModal, closeModal } = useModal();
  const { openConfirm, closeConfirm } = useConfirm();
  const { openAlert } = useAlert();
  const controller = new Controller();

  // 반려동물 정보 삭제
  const petDelete = () => {
    openConfirm({
      title: '반려동물 정보 삭제',
      content: '해당 반려동물 정보를 삭제하시겠습니까?',
      callback: async () => {
        openAlert({
          title: '삭제 실패',
          type: 'error',
          content: '에러가 발생하였습니다.\r\n새로고침 후 다시 시도해주세요'
        });
        const result = await controller.myPetDelete();
        if(result.data.responseCode !== 200) {
          openAlert({
            title: '삭제 실패',
            type: 'error',
            content: '에러가 발생하였습니다.\r\n새로고침 후 다시 시도해주세요'
          });
          return ;
        }

        closeConfirm();
        openAlert({
          title: '반려동물 정보 삭제 성공',
          type: 'success',
          content: '해당 정보가 삭제되었습니다'
        });
      },
    });
  }

   // 반려동물 수정 창 열기
   const petModifyOpen = (petData:any) => {
    const ModalContent = () => (
      <MyPetModifyModal onClose={closeModal} petData={petData} />
    );

    openModal({
      backDrop: false,
      content: <ModalContent />
    });
  }

  return (
    <div className={style.wrap}>
      <div className={style.leftWrap}>
        <div className={style.petImageWrap}>
          <img src={petData.animalsPhotos} alt='petImage' />
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
          <span>{petData.animalsGender}</span>
        </p>
        <p>
          <span>종류</span>
          <span>{petData.animalsCategory1}</span>
        </p>
        <p>
          <span>품종</span>
          <span>{petData.animalsCategory2}</span>
        </p>
      </div>
      <div className={style.buttonGroup}>
        <button type='button' className={style.emptyButton} onClick={() => petModifyOpen(petData)} >수정</button>
        <button type='button' className={style.emptyButton} onClick={petDelete} >삭제</button>
      </div>
    </div>
  )
}
