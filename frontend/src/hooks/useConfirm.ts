import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { confirmState } from "../recoil/confirm";

type OpenConfirmType = {
  title: string;
  content: JSX.Element | string;
  callback?: () => any;
};

export const useConfirm = () => {
  const [confirmDataState, setConfirmDataState] = useRecoilState(confirmState);

  const closeConfirm = useCallback(() =>
  setConfirmDataState((prev:any) => {
        return { ...prev, isOpen: false };
      }),
    [setConfirmDataState]
  );

  const openConfirm = useCallback(({ title, content, callback }: OpenConfirmType) =>
  setConfirmDataState({
        isOpen: true,
        title: title,
        content: content,
        callback: callback
      }),
    [setConfirmDataState]
  );

  return { confirmDataState, closeConfirm, openConfirm };
};
