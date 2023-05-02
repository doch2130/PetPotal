import { atom } from "recoil";

export interface ConfirmType {
  isOpen: boolean;
  title: string;
  content: JSX.Element | string;
  callback?: () => any;
}

export const confirmState = atom<ConfirmType>({
  key: "confirmState",

  default: {
    isOpen: false,
    title: '',
    content: '',
  }
});
