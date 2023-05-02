import { atom } from "recoil";

export interface ModalType {
  isOpen: boolean;
  title: string;
  content: JSX.Element | string;
  callBack?: () => any;
}

export const modalState = atom<ModalType>({
  key: "modalState",

  default: {
    isOpen: false,
    title: '',
    content: '',
  }
});
