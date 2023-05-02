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
    return this.httpClient.post(`users/auth`);
  }

  async join(object) {
    return this.httpClient.post(`users/signup`, object);
  }

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

  async login(object) {
    return this.httpClient.post(`users/signIn`, object);
  }

  // 메이트 글쓰기 - 미리보기 이미지 업로드
  async mateWriteTextEditorImage(object) {
    return this.httpClient.post('mateBoard/textEditorImgFileUpload', object);
  }

  // 메이트 글쓰기
  async mateWrite(object) {
    // return this.httpClient.post(`mateBoard/insertContent`, object);
    return this.httpClient.post(`mateBoard/test`, object);
    // return this.httpClient({
    //   method: 'post',
    //   url: 'mateBoard/test',
    //   headers: {
    //     'Content-Type': 'multipart/form-data', // Content-Type을 반드시 이렇게 하여야 한다.
    //   },
    //   data: object,
    // });
  }

  // 마이 페이지 - 회원정보 가져오기
  async mypageUserInfoGet(object) {
    return this.httpClient.post('users/mypage/userInfoGet', object);
  }
}
