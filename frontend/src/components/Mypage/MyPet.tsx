import { useEffect, useState } from 'react'
import style from './MyPet.module.css';
import { useModal } from '../../hooks/useModal';
import MyPetAddModal from './MyPetAddModal';
import Controller from '../../api/controller';
import MyPetBox from './MyPetBox';

export default function MyPet() {
  const [petList, setPetList] = useState(0);
  const { openModal, closeModal } = useModal();
  const controller = new Controller();

  const myPetAddModal = () => {
    const ModalContent = () => (
      <MyPetAddModal onClose={closeModal}/>
    );
    openModal({
      title: '나의 반려동물 등록',
      content: <ModalContent />
    });
  }

  // useEffect(() => {
  //   controller.myPetInfoLoad();
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <div className={style.wrap}>
      <div className={style.topWrap}>
        <h2>나의 반려동물</h2>
        <button type='button' onClick={myPetAddModal}>등록</button>
      </div>
      <div className={style.myPetWrap}>
        {/* {petList === 0 ?
          <div className={style.myPetEmpty}>
            <h2>등록된 반려동물이 없습니다</h2>
          </div>
        :
          <></>
        } */}
        <div className={style.myPetList}>
          <MyPetBox />
        </div>
      </div>
    </div>
  )
}
