import { useEffect, useState } from 'react'
import { Params, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAlert } from '../../../hooks/useAlert';
import Controller from '../../../api/controller'
import MateUpdatePreview from './MateUpdatePreview';
import MateUpdateForm from './MateUpdateForm';
import style from './MateUpdate.module.css';
import { useRecoilValue } from 'recoil';
import { UserType, userState } from '../../../recoil/user';

export default function MateUpdate() {
  const userInfo = useRecoilValue<UserType[]>(userState);
  const { openAlert } = useAlert();
  const controller = new Controller();
  const historyValue = useParams<Params<string>>(); 
  const [ matePostDetailNumber, setMatePostDetailNumber ] = useState<number | null>(null);
  const [ imgFile, setImgFile ] = useState<File[]>([]);

  useEffect(():void => {
    const historyKeyword = Number(historyValue.matePostNumber);
    if(historyKeyword) {
      setMatePostDetailNumber(historyKeyword);
    }
    return ;
  }, [historyValue]);

  // React Query default
  const fetchMateBoardDetail = async (matePostDetailNumber:string) => {
    try {
      const result = await controller.mateBoardDetailPost(matePostDetailNumber, userInfo[0].account);
      return result.data;
    } catch (err) {
      openAlert({
        title: '게시글 상세 조회 에러',
        type: 'error',
        content: '데이터 로딩 중 에러가 발생하였습니다.\r\n새로고침 후 이용부탁드립니다.',
      });
      return ;
    }
  }

  const { status, data, error, refetch } = useQuery(
    [`mateBoardPostDetail`, matePostDetailNumber], () => fetchMateBoardDetail(String(matePostDetailNumber)),
    { enabled: false } //초기에 데이터 요청을 하지 않음
  );

  useEffect(() => {
    if(matePostDetailNumber) {
      refetch();
    }
  }, [matePostDetailNumber, refetch]);

  useEffect(() => {
    // console.log('data.data ', data?.data);
    
    setImgFile(data?.data.mateBoardPhotos.split(','));
  }, [data]);

  // console.log('imgFile ', imgFile);

  if(status === 'loading') return <div className={style.reactQueryLoading}>Data Loading...</div>

  if(error) return <div className={style.reactQueryError}>Data Load Error</div>


  return (
    <div className={style.wrap}>
      <div className={style.wrapBody}>
        <h1>메이트 글 수정</h1>
        <MateUpdatePreview imgFile={imgFile} setImgFile={setImgFile} mateBoardPhotos={data?.data.mateBoardPhotos}/>
        <p className={style.previewText}>사진은 5개까지 등록이 가능합니다.</p>
        <p className={style.previewText}>1번 사진이 글의 대표사진으로 등록됩니다.</p>
        <MateUpdateForm imgFile={imgFile} MateFormData={data?.data}/>
      </div>
    </div>
  )
}
