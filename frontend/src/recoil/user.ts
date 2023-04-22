import { atom } from "recoil";

export interface UserTypes {
  // id: number;
  account: string;
  message: string;
  responseCode: number;
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
