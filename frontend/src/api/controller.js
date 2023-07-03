import axios from 'axios';
import qs from 'qs';

export default class Controller {
  constructor() {
    this.httpClient = axios.create({
      // baseURL: 'http://localhost:3010/api/',
      baseURL: `${process.env.REACT_APP_BACK_AXIOS}/api/`,
      withCredentials: true,
    });
  }

  // 로그인 상태 체크
  async auth() {
    const result = await this.httpClient.post(`users/auth`);
    // console.log('auth result: ', result.data);
    axios.defaults.headers.common['token'] = `${result.data.token.token}`;
    return result.data;
  }

  // 회원가입
  async join(object) {
    // console.log('object ', object);
    return this.httpClient.post(`users/signUp`, object);
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
  async memberSignOut(account) {
    const result = await this.httpClient.post('users/terminate', { account });
    // console.log('result : ', result);
    if (result.data.responseCode === 200) {
      axios.defaults.headers.common['token'] = ``;
    }
    return result;
  }

  // 네이버 지도 API, 주소를 위경도로 변환
  async naverMapGeocoding(address) {
    return this.httpClient.get(`naverMapGeocoding?address=${address}`);
  }

  // 마이 페이지 - 회원정보 가져오기
  async userInfoLoad(account, password) {
    return this.httpClient.post('users/mypageUsersInfo', { account, password });
  }

  // 마이 페이지 - 프로필 사진 가져오기
  async userProfileLoad(account) {
    return this.httpClient.get(`users/profile?account=${account}`);
    // return this.httpClient.post(`users/loadProfile`, {account});
  }

  // 마이 페이지 - 회원정보 수정
  async userInfoModify(object) {
    // console.log('object : ', object);
    return this.httpClient.post('users/usersInfoModify', object);
  }

  // 마이 페이지 - 회원정보 프로필 수정
  async userProfileModify(object) {
    return this.httpClient.post('users/updateProfile', object);
  }

  // 마이 페이지 - 비밀번호 변경
  async userChangePassword(data) {
    return this.httpClient.put('users/updatePassword', data);
  }

  // 마이 페이지 - 펫 정보 가져오기
  async myPetInfoLoad() {
    return this.httpClient.get(`animals/findByUser`);
  }

  // 마이 페이지 - 펫 정보 삭제
  async myPetDelete(animalsIndexNumber) {
    return this.httpClient.put('animals/deleteInfo', {
      animalsIndexNumber: animalsIndexNumber
    });
  }

  // 마이 페이지 - 펫 이미지 업로드
  async myPetImageModify(object) {
    return this.httpClient.post('animals/updateImage', object);
  }

  // 마이 페이지 - 펫 정보 등록
  async myPetAdd(account, object) {
    return this.httpClient.post('animals/insertContent', object, {
      headers: {
        "Content-Type": "multipart/form-data",
        account: account
      },
    });
  }

  // 마이 페이지 - 펫 정보 수정
  async myPetModify(object) {
    return this.httpClient.put(`animals/updateInfo`, object);
  }

  // 메이트 글쓰기 - 미리보기 이미지 업로드
  async mateWriteTextEditorImage(object) {
    return this.httpClient.post('mateBoard/textEditorImgFileUpload', object);
  }

  // 메이트 글쓰기
  async mateWrite(object) {
    return this.httpClient.post(`mateBoard/insertContent`, object);
  }

  // 메이트 게시판 - 전체 글 가져오기
  async mateBoardList(pageNumber, searchQuery, account, timeSort) {
    let sort = '';
    if(timeSort === 'newest') {
      sort = 'Desc';
    } else {
      sort = 'Asc';
    }

    if(account === '' || account === undefined) {
      return this.httpClient.get(`openMateBoard/findAllContent${sort}/${pageNumber}`,
      {
        params: searchQuery,
        paramsSerializer: params => {
          return qs.stringify(params, { arrayFormat: 'brackets' })
        }
      });
    } else {
      return this.httpClient.get(`mateBoard/findAllContent${sort}/${pageNumber}`,
      {
        params: searchQuery,
        paramsSerializer: params => {
          return qs.stringify(params, { arrayFormat: 'brackets' })
        }
      });
    }
    // return this.httpClient.get(`mateBoard/findAllContent/${pageNumber}`,
    // return this.httpClient.get(`mateBoard/findAllContentDesc/${pageNumber}`,
    // {
    //   params: searchQuery,
    //   paramsSerializer: params => {
    //     return qs.stringify(params, { arrayFormat: 'brackets' })
    //   }
    // })
  }

  // 메이트 게시판 - 상세 글 가져오기
  async mateBoardDetailPost(mateBoardIndexNumber) {
    return this.httpClient.get(`mateBoard/findByIndex/${mateBoardIndexNumber}`);
  }

  // // 메이트 게시판 - 좋아요 게시글 가져오기
  // async mateLikeBoardList(account) {
  //   return this.httpClient.get(`mateBoard/mateLikeBoardList?account=${account}`);
  // }

  // 메이트 게시판 - 상세 글 삭제
  async mateBoardDeletePost(mateBoardIndexNumber) {
    return this.httpClient.put(`mateBoard/deleteContent`, {
      mateBoardIndexNumber: mateBoardIndexNumber,
    });
  }

  // 메이트 게시판 - 상세 글 수정
  async mateBoardUpdatePost(object) {
    return this.httpClient.put(`mateBoard/updateContent`, object);
  }

  // 마이 페이지 - 메이트 본인 글 가져오기
  async myMateBoardPost(account) {
    return this.httpClient.get(`mateBoard/findByUser/${account}`);
  }

}
