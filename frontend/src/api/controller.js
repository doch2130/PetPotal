import axios from 'axios';

export default class Controller {
  constructor() {
    this.httpClient = axios.create({
      baseURL: 'http://localhost:3010/api/',
      withCredentials: true,
    });
  }

  // 로그인 상태 체크
  async auth() {
    const result = await this.httpClient.post(`users/auth`);
    // console.log('auth result: ', result);
    // axios.defaults.headers.common['token'] = `${result.data.token}`;
    axios.defaults.headers.common['token'] = `${result.data.token.token}`;
    return result.data;
  }

  // 회원가입
  async join(object) {
    return this.httpClient.post(`users/signup`, object);
  }

  // 중복검사
  async duplicateCheck(type, value) {
    let apiType = '';

    switch (type) {
      case 'account':
        apiType = 'Account';
        break;
      case 'email':
        apiType = 'Email';
        break;
      case 'phone':
        apiType = 'Phone';
        break;
      case 'nickName':
        apiType = 'NickName';
        break;
      default:
        break;
    }

    return this.httpClient.post(`users/duplicate${apiType}`, {
      [type]: value,
    });
  }

  // 로그인
  async login(object) {
    const result = await this.httpClient.post(`users/signIn`, object);
    // console.log(result);
    // axios.defaults.headers.common['token'] = `${result.data.token}`;
    axios.defaults.headers.common['token'] = `${result.data.data.token}`;
    return result;
  }

  // 로그아웃
  async logout() {
    const result = await this.httpClient.post('users/signOut');
    // console.log('result : ', result);
    if (result.data.responseCode === 200) {
      axios.defaults.headers.common['token'] = ``;
    }
    return result;
  }

  // 회원탈퇴
  async withdrawal() {
    const result = await this.httpClient.delete('users/withdrawal');
    if (result.data.responseCode === 200) {
      axios.defaults.headers.common['token'] = ``;
    }
    return result;
  }

  // 마이 페이지 - 회원정보 가져오기
  async userInfoLoad() {
    return this.httpClient.post('users/mypage/userInfoLoad');
  }

  // 마이 페이지 - 회원정보 수정
  async userInfoModify(object) {
    // console.log('object : ', object);
    return this.httpClient.post('users/mypage/userInfoModify', object);
  }

  // 마이 페이지 - 회원정보 프로필 수정
  async userProfileModify(object) {
    return this.httpClient.post('users/mypage/ProfileImageChange', object);
  }

  // 마이 페이지 - 펫 정보 가져오기
  async myPetInfoLoad() {
    return this.httpClient.post('users/mypage/petInfoLoad');
  }

  // 마이 페이지 - 펫 정보 삭제
  async petDelete() {
    return this.httpClient.delete('users/mypage/petDelete');
  }

  // 메이트 글쓰기 - 미리보기 이미지 업로드
  async mateWriteTextEditorImage(object) {
    return this.httpClient.post('mateBoard/textEditorImgFileUpload', object);
  }

  // 메이트 글쓰기
  async mateWrite(object) {
    return this.httpClient.post(`mateBoard/insertContent`, object);
  }
}
