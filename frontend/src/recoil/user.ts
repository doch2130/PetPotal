import { atom } from "recoil";

export interface UserType {
  account: String;
  address1: String;
  address2: String;
  address3: String;
  message: String;
  responseCode: Number;
}

export const userState = atom<UserType[]>({
  key: "userInfo",

  default: [
    {
      account: '',
      address1: '',
      address2: '',
      address3: '',
      message: '',
      responseCode: 0,
    },
  ],
});
