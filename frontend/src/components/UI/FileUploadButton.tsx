import style from './FileUploadButton.module.css';

interface propsData {
  imgFileHandler: Function;
}

export default function FileUploadButton(props:propsData) {
  const {imgFileHandler} = props;

  const onLoadFile = (e:any) => {
    const files = e.target.files;
    // console.log(e.target.files);
    console.log('files : ', files);

    // console.log('files.length : ', files.length);
    if(files.length > 5) {
      alert('사진은 5개 이하만 등록 가능합니다.');
      return ;
    }


    const obj = [];
    for (const key in files) {
      // console.log(key);
      // console.log(typeof key);
      // console.log('files[key] : ', files[key]);

      if(key === 'length' || key === 'item') continue;

      obj.push(files[key])
    }

    // console.log('obj : ', obj);

    imgFileHandler(obj.sort().reverse());
  }

  return (
    <div className={style.filebox}>
      <label htmlFor="fileUploadButton">사진 업로드</label>
      <input type="file" id="fileUploadButton" accept="image/*" multiple onChange={onLoadFile} />
    </div>
  )
}
