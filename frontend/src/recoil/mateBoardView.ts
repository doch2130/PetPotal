import { atom } from "recoil";

export interface mateBoardViewType {
  viewChange: boolean;
}

export const mateBoardViewState = atom<mateBoardViewType>({
  key: "mateBoardViewType",

  default: 
  {
    viewChange: true
  }
});
