import React, { ChangeEvent, MouseEventHandler } from 'react'
import style from './MyPetAddModal.module.css';
import PictureBox from '../UI/PictureBox';
import FileUploadButton from '../UI/FileUploadButton';
import defaultImg from '../../assets/icon/animal.png';

interface props {
  onClose: Function;
}

export default function MyPetAddModal(props:props) {
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
          <label>이름</label>
          <input type='text' defaultValue='' placeholder='반려동물 이름을 입력하세요' />
        </div>
        <div className={style.myPetAge}>
          <label htmlFor='petAge'>나이</label>
          <select id='petAge' name='petAge'>
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
        </div>
        <div className={style.myPetGender}>
          <label>성별</label>
          <input type="radio" id='petGenderMan' value="수컷" name='petGender' />
          <label htmlFor='petGenderMan'>수컷</label>
          <input type="radio" id='petGenderWoman' value="암컷" name='petGender' />
          <label htmlFor='petGenderWoman'>암컷</label>
        </div>
        <div className={style.petSpecies}>
          <label htmlFor='petSpecies'>종류</label>
          <select id='petSpecies' name='petSpecies'>
            <option defaultValue="선택">종류를 선택해주세요</option>
            <option defaultValue="강아지">강아지</option>
            <option defaultValue="고양이">고양이</option>
            <option defaultValue="기타">기타</option>
          </select>
        </div>
        <div>
          <label>품종</label>
          <input type='text' defaultValue='' placeholder='반려동물 품종을 입력하세요' />
        </div>
        <div className={style.buttonGroup}>
          <button type='button' onClick={onClose as MouseEventHandler}>취소</button>
          <button type='button'>등록</button>
        </div>
      </form>
    </div>
  )
}
