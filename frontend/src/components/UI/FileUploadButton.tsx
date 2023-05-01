import React, { ChangeEventHandler } from 'react';
import style from './FileUploadButton.module.css';

interface propsData {
  onLoadFileHandler: Function;
  multiple: Boolean;
}

const FileUploadButton = (props:propsData) => {
  const {onLoadFileHandler, multiple } = props;

  return (
    <div className={style.filebox}>
      <label htmlFor="fileUploadButton">사진 업로드</label>
      {multiple &&
      <input type="file" id="fileUploadButton" accept="image/*" multiple
      onChange={onLoadFileHandler as ChangeEventHandler<HTMLInputElement>} />}

      {!multiple &&
      <input type="file" id="fileUploadButton" accept="image/*"
      onChange={onLoadFileHandler as ChangeEventHandler<HTMLInputElement>} />}
    </div>
  )
}

export default React.memo(FileUploadButton);