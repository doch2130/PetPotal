import { useEffect, useState } from 'react'
import { useModal } from '../../hooks/useModal';
import { useAlert } from '../../hooks/useAlert';
import MyPetAddModal from './MyPetAddModal';
import MyPetBox from './MyPetBox';
import Controller from '../../api/controller';
import style from './MyPet.module.css';

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

export default function MyPet() {
  // const [petList, setPetList] = useState(tempDataArray);
  const [ petList, setPetList ] = useState<myPetInfoInterface[]>([]);
  const { openModal, closeModal } = useModal();
  const { openAlert } = useAlert();
  const controller = new Controller();

  const myPetAddModal = () => {
    const ModalContent = () => (
      <MyPetAddModal onClose={closeModal} petList={petList} setPetList={setPetList} />
    );
    openModal({
      backDrop: false,
      content: <ModalContent />
    });
  }

  useEffect(():void => {
    const myPetInfoLoadFunction = async ():Promise<void> => {
      try {
        const result = await controller.myPetInfoLoad();
        // console.log('result ', result);
        setPetList(result.data.data);
        return ;
      } catch (err:any) {
        openAlert({
          title: '나의 펫 정보 불러오기 오류',
          type: 'error',
          content: '데이터 로딩 중 에러가 발생하였습니다.\r\n새로고침 후 이용 부탁드립니다.',
        });
        return ;
      }
    }

    myPetInfoLoadFunction();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [petList.length]);

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
              <MyPetBox petData={el} petList={petList} setPetList={setPetList} />
            </div>
          </div>
          )
        })}
    </div>
  )
}
