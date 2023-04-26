import { atom } from "recoil";

export interface UserTypes {
  account: String;
  message: String;
  responseCode: Number;
}

export const userState = atom<UserTypes[]>({
  key: "userInfo",

  default: [
    {
      account: '',
      message: '',
      responseCode: 0,
    },
  ],
});
