import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { confirmState } from "../recoil/confirm";

type OpenConfirmType = {
  content: JSX.Element | string;
  callback?: () => any;
};

export const useConfirm = () => {
  const [confirmDataState, setConfirmDataState] = useRecoilState(confirmState);
  const bodyElement = document.querySelector('body') as HTMLBodyElement;

  const closeConfirm = useCallback(() =>
  setConfirmDataState((prev:any) => {
    bodyElement.style.overflow = 'auto';
      return { ...prev, isOpen: false };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [setConfirmDataState]
  );

  const openConfirm = useCallback(({ content, callback }: OpenConfirmType) =>
  setConfirmDataState(() => {
    bodyElement.style.overflow = 'hidden';
    return {
      isOpen: true,
      content: content,
      callback: callback
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [setConfirmDataState]
  );

  return { confirmDataState, closeConfirm, openConfirm };
};
