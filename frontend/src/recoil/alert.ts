import { atom } from "recoil";

export interface AlertType {
  isOpen: boolean;
  title: string;
  type: string;
  content: JSX.Element | string;
}

// type => success / error

export const alertState = atom<AlertType>({
  key: "alertState",

  default: {
    isOpen: false,
    title: '',
    type: '',
    content: '',
  }
});
