import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../recoil/modal";

type OpenModalType = {
  title: string;
  content: JSX.Element | string;
  callback?: () => any;
};

export const useModal = () => {
  const [modalDataState, setModalDataState] = useRecoilState(modalState);

  const closeModal = useCallback(() =>
      setModalDataState((prev:any) => {
        return { ...prev, isOpen: false };
      }),
    [setModalDataState]
  );

  const openModal = useCallback(({ title, content, callback }: OpenModalType) =>
      setModalDataState({
        isOpen: true,
        title: title,
        content: content,
        callback: callback
      }),
    [setModalDataState]
  );

  return { modalDataState, closeModal, openModal };
};
