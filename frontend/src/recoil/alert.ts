import { atom } from "recoil";

export interface AlertType {
  isOpen: boolean;
  type: string;
  content: JSX.Element | string;
}

// type => success / error

export const alertState = atom<AlertType>({
  key: "alertState",

  default: {
    isOpen: false,
    type: '',
    content: '',
  }
});
