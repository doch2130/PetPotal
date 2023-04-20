import style from './FileUploadButton.module.css';

export default function FileUploadButton() {
  return (
    <div className={style.filebox}>
    <label htmlFor="fileUploadButton">사진 업로드</label>
    <input type="file" id="fileUploadButton" />
  </div>
  )
}
