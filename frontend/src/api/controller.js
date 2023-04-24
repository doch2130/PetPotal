import axios from 'axios';

export default class Controller {
  constructor() {
    this.httpClient = axios.create({
      baseURL: 'http://localhost:3010/api/',
      withCredentials: true,
    });
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

  async mateWrite(object) {
    return this.httpClient.post(`mateBoard/insertContent`, object);
  }
}
