import style from './MyPetBox.module.css';
import defaultImg from '../../assets/mainpage/Hoteling/MainPage_Hoteling_Img_2.jpg';
import { useConfirm } from '../../hooks/useConfirm';
import { useAlert } from '../../hooks/useAlert';
import Controller from '../../api/controller';
import MyPetModifyModal from './MyPetModifyModal';
import { useModal } from '../../hooks/useModal';

export default function MyPetBox() {
  const { openModal, closeModal } = useModal();
  const { openConfirm } = useConfirm();
  const { openAlert } = useAlert();
  const controller = new Controller();

  // 반려동물 정보 삭제
  const petWithdrawal = () => {
    openConfirm({
      title: '반려동물 정보 삭제',
      content: '해당 반려동물 정보를 삭제하시겠습니까?',
      callback: async () => {
        openAlert({
          title: '삭제 실패',
          content: '에러가 발생하였습니다. 새로고침 후 다시 시도해주세요'
        });
        const result = await controller.petDelete();
        if(result.data.statusCode !== 200) {
          openAlert({
            title: '삭제 실패',
            content: '에러가 발생하였습니다. 새로고침 후 다시 시도해주세요'
          });
          return ;
        }

        openAlert({
          title: '반려동물 정보 삭제 성공',
          content: '해당 정보가 삭제되었습니다'
        });
      },
    });
  }

   // 반려동물 수정 창 열기
   const petModifyOpen = () => {
    const ModalContent = () => (
      <MyPetModifyModal onClose={closeModal} />
    );

    openModal({
      title: "반려동물 정보 수정",
      content: <ModalContent />
    });
  }

  return (
    <div className={style.wrap}>
      <div className={style.leftWrap}>
        <div className={style.petImageWrap}>
          <img src={defaultImg} alt='petImage' />
        </div>
      </div>
      <div className={style.rightWrap}>
        <p>
          <span>이름</span>
          <span>단추</span>
        </p>
        <p>
          <span>나이</span>
          <span>10세</span>
        </p>
        <p>
          <span>성별</span>
          <span>수컷</span>
        </p>
        <p>
          <span>종류</span>
          <span>강아지</span>
        </p>
        <p>
          <span>품종</span>
          <span>포메라니안</span>
        </p>
      </div>
      <div className={style.buttonGroup}>
        <button type='button' className={style.emptyButton} onClick={petModifyOpen} >수정</button>
        <button type='button' className={style.emptyButton} onClick={petWithdrawal} >삭제</button>
      </div>
    </div>
  )
}
