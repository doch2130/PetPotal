import style from './MyInfo.module.css';
import defaultImg from '../../assets/icon/people.png';

export default function MyInfo() {
  const leave = () => {
    if(window.confirm('정말로 탈퇴하시겠습니까?')) {
      console.log('탈퇴');
    }
  }

  const modify = () => {
    console.log('모달 켜기');
  }

  return (
    <div className={style.wrap}>
      <h2>회원정보</h2>
        <div className={style.myInfoWrap}>
          <div className={style.myInfoLeft}>
            <div className={style.myImageWrap}>
              <img src={defaultImg} alt='myImage' />
            </div>
          </div>
          <div className={style.myInfoRight}>
            <p>test1</p>
            <p>테스트닉네임</p>
            <p>010-1234-5678</p>
            <p>서울시 중구 중림동</p>
            <p>744-55 자이아파트 101동</p>
          </div>
        </div>
        <div className={style.buttonGroup}>
          <button type='button' className={style.fullButton} onClick={modify}>수정</button>
          <button type='button' className={style.fullButton} onClick={leave}>탈퇴</button>
      </div>
    </div>
  )
}
