import { ChangeEvent, MouseEventHandler } from 'react'
import style from './MyInfoModifyModal.module.css';
import PictureBox from '../UI/PictureBox';
import defaultImg from '../../assets/icon/people.png';
import FileUploadButton from '../UI/FileUploadButton';

const tempData = {
  id: 'PetPotal',
  name: '펫포탈',
  nickname: '펫포탈관리자',
  email: 'petpotal@gmail.com',
  address: '서울시 중구 만리동',
  address2: '자이아파트 101동 1101호'
}

interface userData {
  account: '',
  name: '',
  nickName: '',
  phone: '',
  email: '',
  address: '',
  address4: '',
}

interface propsData {
  onClose: Function;
  setUserData: Function;
  userData: userData;
}

export default function MyInfoModifyModal(props:propsData) {
  const { onClose } = props;

  const imgFileHandler = (e:ChangeEvent<HTMLInputElement>):void => {
    const files:any = e.target.files;

    if(files === null || files.length === 0) {
      return ;
    }
  };

  

  return (
    <div className={style.wrap}>
      <PictureBox width='150px' height='150px' >
        <img src={defaultImg} alt='defaultImage' />
      </PictureBox>
      <FileUploadButton onLoadFileHandler={imgFileHandler} multiple={false} />
      <form className={style.wrapForm}>
        <div>
          <label>아이디</label>
          <input type='text' defaultValue={tempData.id} readOnly disabled />
        </div>
        <div>
          <label>비밀번호</label>
          <input type='password' defaultValue='' placeholder='현재 비밀번호를 입력하세요' />
        </div>
        <div>
          <label>비밀번호 변경</label>
          <input type='password' defaultValue='' placeholder='변경할 비밀번호를 입력하세요' />
        </div>
        <div>
          <label>이름</label>
          <input type='text' defaultValue={tempData.name} placeholder='이름을 입력하세요' />
        </div>
        <div>
          <label>닉네임</label>
          <input type='text' defaultValue={tempData.nickname} placeholder='닉네임을 입력하세요' />
        </div>
        <div>
          <label>이메일</label>
          <input type='text' defaultValue={tempData.email} readOnly disabled />
        </div>
        <div>
          <label>주소</label>
          <input type='text' defaultValue={tempData.address} placeholder='주소를 입력하세요' />
        </div>
        <div>
          <label>상세주소</label>
          <input type='text' defaultValue={tempData.address2} placeholder='상세주소를 입력하세요' />
        </div>
        <div className={style.buttonGroup}>
          <button type='button' onClick={onClose as MouseEventHandler}>취소</button>
          <button type='button'>수정</button>
        </div>
      </form>
    </div>
  )
}
