import { atom } from "recoil";

export interface UserTypes {
  // id: number;
  message: string;
  responseCode: number;
}

export const userState = atom<UserTypes[]>({
  key: "userInfo",

  default: [
    {
      message: '',
      responseCode: 0,
    },
  ],
});
