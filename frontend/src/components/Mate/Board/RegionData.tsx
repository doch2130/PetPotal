interface RegionDataInterface {
  [key: string]: string[];
}

const RegionData:RegionDataInterface[] = [
  {
    서울: ['전체', '강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구',
    '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구',
    '송파구', '양천구', '영등포구', '용산구', '은평구', '중로구', '중구', '중랑구', ''],
  },
  {
    부산: ['전체', '', '', '', '', '', '', '', ''],
  },
  {
    대구: ['전체', '마포구'],
  },
  {
    인천: ['전체', '마포구'],
  },
  {
    광주: ['전체', '마포구'],
  },
  {
    대전: ['전체', '마포구'],
  },
  {
    울산: ['전체', '마포구'],
  },
  {
    세종: ['전체', '마포구'],
  },
  {
    경기: ['전체', '마포구'],
  },
  {
    경남: ['전체', '마포구'],
  },
  {
    경북: ['전체', '마포구'],
  },
  {
    충남: ['전체', '마포구'],
  },
  {
    충북: ['전체', '마포구'],
  },
  {
    전남: ['전체', '마포구'],
  },
  {
    전북: ['전체', '마포구'],
  },
  {
    강원: ['전체', '마포구'],
  },
  {
    제주: ['전체', '마포구'],
  },
  {
    전국: ['전체'],
  },
];

export default RegionData;
