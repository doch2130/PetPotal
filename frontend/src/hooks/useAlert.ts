import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { alertState } from "../recoil/alert";

type OpenAlertType = {
  content: JSX.Element | string;
  type: string;
  callback?: () => any;
};

export const useAlert = () => {
  const [alertDataState, setAlertDataState] = useRecoilState(alertState);
  const bodyElement = document.querySelector('body') as HTMLBodyElement;

  const closeAlert = useCallback(() =>
    setAlertDataState((prev:any) => {
      bodyElement.style.overflow = 'auto';
      return { ...prev, isOpen: false };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [setAlertDataState]
  );

  const openAlert = useCallback(({ content, type }: OpenAlertType) =>
    setAlertDataState(() => {
      bodyElement.style.overflow = 'hidden';
      return {
        isOpen: true,
        type: type,
        content: content
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [setAlertDataState]
  );

  return { alertDataState, closeAlert, openAlert };
};
