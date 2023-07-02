import { MouseEventHandler } from 'react'
import style from './MateBoardPostTable.module.css';
import moment from 'moment';

interface MateBoardPostTableInterface {
  detailPostMoveHandler: Function;
  userId? : String;
  postData: MateBoardPostListInterface;
}

interface MateBoardPostListInterface {
  mateBoardIndexNumber: number;
  mateBoardTitle: string;
  mateBoardFee: number;
  mateBoardContent: string;
  mateBoardContent2: string;
  mateBoardPhotos: string;
  mateBoardCategory: number;
  mateBoardRegistDate: string;
  mateBoardModifyDate: string;
  mateBoardStatus: number;
  animalsIndexNumber?: number;
  mateBoardAddress: string;
  mateBoardLng: number;
  mateBoardLat: number;
}

export default function MateBoardPostTable(props:MateBoardPostTableInterface) {
  // console.log('props ', props);
  const { userId, postData, detailPostMoveHandler } = props;
  const date = new Date();
  const compareDate = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
  // console.log(date);
  // console.log(date.getFullYear());
  // console.log(date.getMonth());
  // console.log(date.getDate());
  // console.log('compareDate ', compareDate);
  // console.log('moment', moment(postData.mateBoardRegistDate).format('YYYY-MM-DD HH:mm'));
  // console.log('moment', moment(postData.mateBoardRegistDate).format('YYYY-MM-DD'));
  // console.log('compareDate', compareDate);
  // console.log('moment', moment(postData.mateBoardRegistDate).format('YYYY-MM-DD') === compareDate);
  // console.log('moment', moment(postData.mateBoardRegistDate).format('YYYY-MM-DD') === compareDate.toString());

  return (
    <div className={style.wrap} onClick={detailPostMoveHandler as MouseEventHandler}>
      <p>{postData.mateBoardIndexNumber}</p>
      <p>{postData.mateBoardCategory === 1 ? '구함' : '지원'}</p>
      <p>{postData.mateBoardTitle}</p>
      <p>{postData.mateBoardFee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</p>
      {/* <p>{moment(postData.mateBoardRegistDate).format('YYYY-MM-DD HH:mm')}</p> */}
      <p>{moment(postData.mateBoardRegistDate).format('YYYY-MM-DD') === compareDate ? moment(postData.mateBoardRegistDate).format('HH:mm')
      : moment(postData.mateBoardRegistDate).format('YYYY-MM-DD')}</p>
    </div>
  )
}
