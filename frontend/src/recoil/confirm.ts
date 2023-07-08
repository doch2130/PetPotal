import { atom } from "recoil";

export interface ConfirmType {
  isOpen: boolean;
  content: JSX.Element | string;
  callback?: () => any;
}

export const confirmState = atom<ConfirmType>({
  key: "confirmState",

  default: {
    isOpen: false,
    content: '',
  }
});
