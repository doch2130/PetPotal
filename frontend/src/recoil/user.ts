import { atom } from "recoil";

export interface UserType {
  account: String;
  message: String;
  responseCode: Number;
}

export const userState = atom<UserType[]>({
  key: "userInfo",

  default: [
    {
      account: '',
      message: '',
      responseCode: 0,
    },
  ],
});
