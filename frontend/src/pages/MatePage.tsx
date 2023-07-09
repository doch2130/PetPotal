import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import PrivatePage from "./PrivatePage";
import MateBoard from "../components/Mate/Board/MateBoard";
import MateWrite from "../components/Mate/Write/MateWrite";
import MateDetail from "../components/Mate/View/MateDetail";
import ErrorPage from "./ErrorPage";
import MateUpdate from "../components/Mate/Update/MateUpdate";

export default function MatePage() {
  const navigater = useNavigate();
  const { page } = useParams<{ page: string}>();
  const [pageValue, setPageValue] = useState<String>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  useEffect(() => {
    if(page !== undefined) {
      setPageValue(page);
    } else {
      setPageValue('board');
      navigater('/board/1');
    }
    setIsLoading(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div>
      {isLoading ? 
      <>
      {pageValue === 'board' ? <MateBoard /> :
      pageValue === 'write' ? <PrivatePage><MateWrite /></PrivatePage> :
      pageValue === 'detail' ? <MateDetail /> :
      pageValue === 'update' ? <PrivatePage><MateUpdate /></PrivatePage> :
      <ErrorPage />}
      </>
      :
      <LoadingPage />}
    </div>
  )
}
