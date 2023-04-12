import { useDaumPostcodePopup } from 'react-daum-postcode';
import style from './MemberJoin.module.css';
import { useState } from 'react';

export default function MemberJoin() {
    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');

    const POSTCODE_URL = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    const POST_WIDTH = 500;
    const POST_HEIGHT = 500;
    const open = useDaumPostcodePopup(POSTCODE_URL);

    const handleComplete = (data : any) => {
        const test = 'roadAddress'
        const fullArress = `(${data.zonecode}) ${data.address}`
        setAddress(fullArress);
    };

    const onAddressClickHandle = () => {

        open({width : POST_WIDTH, height : POST_HEIGHT, onComplete : handleComplete, top: (window.screen.height / 2) - (POST_HEIGHT / 2), left: (window.screen.width / 2) - (POST_WIDTH / 2)});
    };

    return (
        <article className={style.joinContainer}>
            <h1 className={style.joinTitle}>회원가입</h1>
            <div className={style.joinDivider}>
                <span className={style.requiredTag}>필수입력사항</span>
            </div>
            <div className={style.joinForm}>
                <div className={style.inputColumnWrapper}>
                    <label className={style.joinLabel}>아이디</label>
                    <input className={style.joinInput} type="text" placeholder='아이디를 입력해주세요' />
                    <button className={style.joinButton}>중복확인</button>
                </div>

                <div className={style.inputColumnWrapper}>
                <label className={style.joinLabel}>비밀번호</label>
                    <input className={style.joinInput} type="password" placeholder='비밀번호를 입력해주세요' />
                    <div className={style.empty}></div>
                </div>

                <div className={style.inputColumnWrapper}>
                    <label className={style.joinLabel}>비밀번호확인</label>
                    <input className={style.joinInput}type="password" placeholder='비밀번호를 한번 더 입력해주세요' />
                    <div className={style.empty}></div>
                </div>

                <div className={style.inputColumnWrapper}>
                    <label className={style.joinLabel}>이름</label>
                    <input className={style.joinInput}type="text" placeholder='이름을 입력해주세요' />
                    <div className={style.empty}></div>
                </div>

                <div className={style.inputColumnWrapper}>
                    <label className={style.joinLabel}>이메일</label>
                    <input className={style.joinInput}type="text" placeholder='예: petportal@gmail.com' />
                    <div className={style.empty}></div>
                </div>

                <div className={style.inputColumnWrapper}>
                    <label className={style.joinLabel}>휴대폰</label>
                    <input className={style.joinInput}type="text" placeholder='슷자만 입력해주세요.' />
                    <div className={style.empty}></div>
                </div>

                <div className={style.inputColumnWrapper}>
                    <label className={style.joinLabel}>주소</label>
                    <input className={style.joinInput} type="text" placeholder='주소를 입력해주세요.'  value={address || ''} disabled />
                    <button className={style.joinButton} onClick={onAddressClickHandle}>주소검색</button>
                </div>

                <div className={style.inputColumnWrapper}>
                    <label className={style.joinLabel}>상세주소</label>
                    <input className={style.joinInput} type="text" placeholder='상세주소를 입력해주세요.'/>
                    <div className={style.empty}></div>
                </div>

                <div className={style.joinDivider}></div>


            </div>
        </article>
    );
}

