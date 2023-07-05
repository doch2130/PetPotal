import { MouseEventHandler } from 'react'
import style from './MateBoardPostTable.module.css';

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
  const { postData, detailPostMoveHandler } = props;
  const date = new Date();
  const compareDate = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;

  return (
    <div className={style.wrap} onClick={detailPostMoveHandler as MouseEventHandler}>
      <p>{postData.mateBoardIndexNumber}</p>
      <p>{postData.mateBoardCategory === 1 ? '구함' : '지원'}</p>
      <p>{postData.mateBoardTitle}</p>
      <p>{postData.mateBoardFee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</p>
      <p>{ postData.mateBoardRegistDate.split('T')[0] === compareDate ?
      `${postData.mateBoardRegistDate.split('T')[1].split(':')[0]}:${postData.mateBoardRegistDate.split('T')[1].split(':')[1]}`
      : postData.mateBoardRegistDate.split('T')[0] }</p>
    </div>
  )
}
