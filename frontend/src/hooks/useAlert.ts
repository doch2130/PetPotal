import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { alertState } from "../recoil/alert";

type OpenAlertType = {
  title: string;
  content: JSX.Element | string;
  callback?: () => any;
};

export const useAlert = () => {
  const [alertDataState, setAlertDataState] = useRecoilState(alertState);

  const closeAlert = useCallback(() =>
    setAlertDataState((prev:any) => {
        return { ...prev, isOpen: false };
      }),
    [setAlertDataState]
  );

  const openAlert = useCallback(({ title, content }: OpenAlertType) =>
    setAlertDataState({
        isOpen: true,
        title: title,
        content: content
      }),
    [setAlertDataState]
  );

  return { alertDataState, closeAlert, openAlert };
};
