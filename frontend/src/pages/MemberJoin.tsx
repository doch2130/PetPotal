import { useDaumPostcodePopup } from 'react-daum-postcode';
import style from './MemberJoin.module.css';
import { useState } from 'react';
import Controller from '../api/controller';

export default function MemberJoin() {
    const POSTCODE_URL = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    const controller = new Controller();
    const POST_WIDTH = 500;
    const POST_HEIGHT = 500;

    const open = useDaumPostcodePopup(POSTCODE_URL);

    type Value = {sido: string, sigungu: string, zonecode: string, address: string}

    const test = (data : Value) => {
        const fullAddress = `(${data.zonecode}) ${data.address}`;
        setForm({
            ...form,
            address1: data.sido,
            address2: data.sigungu,
            address3: data.address,
            detailAddress: fullAddress,
        });

    };

    const onAddressClickHandle = () => {
        open({width : POST_WIDTH, height : POST_HEIGHT, onComplete : test, top: (window.screen.height / 2) - (POST_HEIGHT / 2), left: (window.screen.width / 2) - (POST_WIDTH / 2)});
    };

    const [form, setForm] = useState({
        account: '',
        accountDuplicate : false,
        password: '',
        passwordCheck: '',
        name: '',
        nickName: '',
        nickNameDuplicate : false,
        phone: '',
        email: '',
        address1: '',
        address2: '',
        address3: '',
        detailAddress: '',
    });

    const {account, password, passwordCheck, name, nickName, email, phone, address1, address2, address3, detailAddress} = form;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        
        setForm({
            ...form,
            [name]: value,
        });
        
        switch(name) {
            case 'email':
                //Todo Email 정규표현식
                break;
            case 'password':
                // Better Comments
                // TODO Password 정규 표현식
                // ? 
                // *
                // !
            case 'passwordCheck':
                // TODO Password PasswordCheck 값 비교
                
        }
    };
    

    const onHandleDuplicateCheck = (e: React.MouseEvent<HTMLButtonElement>) => {

    };

    const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log("실행");
        console.log(form);
        controller.join(form);
    };


    return (
        <div className={style.joinContainer} >
            <h1 className={style.joinTitle}>회원가입</h1>
            <div className={style.joinDivider}>
                <span className={style.requiredTag}>필수입력사항</span>
            </div>
            <div className={style.joinForm}>
                <div className={style.inputColumnWrapper}>
                    <label className={style.joinLabel}>아이디</label>
                    <input className={style.joinInput} type="text" name='account' value={account} placeholder='아이디를 입력해주세요' onChange={onChange} />
                    <button className={style.joinButton}>중복확인</button>
                </div>

                <div className={style.inputColumnWrapper}>
                <label className={style.joinLabel}>비밀번호</label>
                    <input className={style.joinInput} type="password" name='password' value={password} placeholder='비밀번호를 입력해주세요' onChange={onChange} />
                    <div className={style.empty}></div>
                </div>

                <div className={style.inputColumnWrapper}>
                    <label className={style.joinLabel}>비밀번호확인</label>
                    <input className={style.joinInput} type="password" name='passwordCheck' value={passwordCheck} placeholder='비밀번호를 한번 더 입력해주세요' onChange={onChange} />
                    <div className={style.empty}></div>
                </div>

                <div className={style.inputColumnWrapper}>
                    <label className={style.joinLabel}>이름</label>
                    <input className={style.joinInput}type="text" name='name' value={name} placeholder='이름을 입력해주세요' onChange={onChange} />
                    <div className={style.empty}></div>
                </div>

                <div className={style.inputColumnWrapper}>
                    <label className={style.joinLabel}>닉네임</label>
                    <input className={style.joinInput}type="text" name='nickName' value={nickName} placeholder='이름을 입력해주세요' onChange={onChange} />
                    <button className={style.joinButton} onClick={onHandleDuplicateCheck}>중복확인</button>
                </div>

                <div className={style.inputColumnWrapper}>
                    <label className={style.joinLabel}>이메일</label>
                    <input className={style.joinInput} type="text" name='email' value={email} placeholder='예: petportal@gmail.com' onChange={onChange}/>
                    <button className={style.joinButton}>중복확인</button>
                </div>

                <div className={style.inputColumnWrapper}>
                    <label className={style.joinLabel}>휴대폰</label>
                    <input className={style.joinInput} type="text" name='phone' value={phone} placeholder='슷자만 입력해주세요.' onChange={onChange}/>
                    <div className={style.empty}></div>
                </div>

                <div className={style.inputColumnWrapper}>
                    <label className={style.joinLabel}>주소</label>
                    <input className={style.joinInput} type="text" placeholder='주소를 입력해주세요.' name='address' value={detailAddress || ''} onChange={onChange} disabled/>
                    <button className={style.joinButton} onClick={onAddressClickHandle}>주소검색</button>
                </div>

                <div className={style.joinDivider}></div>
                <button className={style.joinSubmitButton} onClick={onSubmit}>가입하기</button>
            </div>
        </div>
    );
}

