import { atom } from "recoil";

export interface AlertType {
  isOpen: boolean;
  title: string;
  content: JSX.Element | string;
}

export const alertState = atom<AlertType>({
  key: "alertState",

  default: {
    isOpen: false,
    title: '',
    content: '',
  }
});
