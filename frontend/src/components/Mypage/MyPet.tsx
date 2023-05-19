import { useEffect, useState } from 'react'
import style from './MyPet.module.css';
import { useModal } from '../../hooks/useModal';
import MyPetAddModal from './MyPetAddModal';
import Controller from '../../api/controller';
import MyPetBox from './MyPetBox';

const tempDataArray: any[] | (() => any[]) = [
  {
    animalsName: '단추',
    animalsAge: 10,
    animalsGender: '수컷',
    animalsNeutered: '아니오',
    animalsWeight: 10.5,
    animalsCategory1: '강아지',
    animalsCategory2: '포메라니안',
    animalsPhotos: '/static/media/MainPage_Hoteling_Img_2.1be147f53fe8107cd837.jpg',
  },
  {
    animalsName: '가을',
    animalsAge: 8,
    animalsGender: '암컷',
    animalsNeutered: '예',
    animalsWeight: 5,
    animalsCategory1: '고양이',
    animalsCategory2: '페르시안',
    animalsPhotos: '/static/media/MainPage_Cat.9fed3dbb00482ebb7bdf.png',
  }
]

export default function MyPet() {
  const [petList, setPetList] = useState(tempDataArray);
  const { openModal, closeModal } = useModal();
  const controller = new Controller();

  const myPetAddModal = () => {
    const ModalContent = () => (
      <MyPetAddModal onClose={closeModal} />
    );
    openModal({
      backDrop: false,
      content: <ModalContent />
    });
  }

  // useEffect(() => {
  //   controller.myPetInfoLoad();
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <div className={style.wrap} style={{'minHeight': `${300* petList.length}px`}} >
      <div className={style.topWrap}>
        <h2>나의 반려동물</h2>
        <button type='button' onClick={myPetAddModal}>등록</button>
      </div>
      {petList.length === 0 &&
        <div className={style.myPetWrap}>
          <div className={style.myPetEmpty}>
            <h2>등록된 반려동물이 없습니다</h2>
          </div>
        </div>
      }
      {petList?.map((el, index) => {
          return (
          <div className={style.myPetWrap} key={index}>
            <div className={style.myPetList}>
              <MyPetBox petData={el} />
            </div>
          </div>
          )
        })}
    </div>
  )
}
