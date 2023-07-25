<h1> PetPotal </h1>

<h1> 프로젝트 소개 (Project Described) </h1>
<h3> 1. 기획 의도 </h3>
PetPotal이라는 이름은 애완동물을 위한 문을 의미하는데, 이 경우에는 애완동물과 관련된 정보와 서비스를 제공하는 포털 사이트를 의미합니다.
가정집에 필수적인 요소가 되어가는 반려동물의 시대에,
반려동물에게 필요한 모든 서비스를 한 곳에서 볼 수 있는 편리한 사이트 제작이 목표입니다.
<br />
The name PetPotal means a door for pets, in this case a portal site that provides information and services related to pets.
In the era of companion animals becoming an essential element in a home, our goal is to create a convenient site where you can see all the services you need for companion animals in one place.

<h3> 2. 주요 기능 </h3>

|기능| 설명|
|:---|:---|
|Main Page|1. 홈페이지에 대한 설명을 볼 수 있다.<br>2. Header를 통해 로그아웃할 수 있다.|
|Signup / Login / Logout|1. 아이디, 닉네임, 이메일,  중복확인을 할 수 있다.<br>2. 회원가입 시 React-Hook-Form을 이용한 유효성 검사를 할 수 있다.<br>3. 로그인에 성공할 때 JWToken이 생성된다.<br>4. 로그아웃에 성공할 때 Session, JWToken이 삭제된다.<br>5. 로그인 이후 마이 페이지에 접속할 수 있다.|
|MY Page|1. 비밀번호 변경 기능을 사용할 수 있다.<br>2. 회원 정보를 수정할 수 있다.<br>3. 회원의 프로필 사진을 등록, 변경할 수 있다.<br>4. 회원 탈퇴를 할 수 있다.<br>5. 나의 반려동물을 등록, 수정, 삭제할 수 있다.<br>6. 나의 반려동물 사진을 등록, 변경할 수 있다.<br>7. 내가 작성한 글, 지원한 글, 관심 글을 확인할 수 있다.|
|Mate Page|1. 지역, 동물 종류, 금액, 글 종류에 따라서 게시글을 검색할 수 있다.<br>2. 최신순, 오래된 순으로 정렬할 수 있다.<br>3. 게시글의 UI 방식(카드, 테이블)을 변경할 수 있다.<br>4. 게시글 개수에 따라서 페이지 이동 버튼 기능을 사용할 수 있다.<br>5. 게시글을 작성할 수 있다.<br>6. 게시글 작성 시 React-Hook-Form을 통한 유효성 검사를 진행 후 데이터를 전송한다.<br>7. 게시글 작성 시 사진을 최대 5개까지 업로드할 수 있다.<br>8. 게시글 작성 시 사진 업로드 기능을 사용하면 임시 URL로 미리보기를 보여주며, 마우스 드래그로 이미지 슬라이드 기능을 사용할 수 있다.<br>9. 게시글 작성 시 Text Editor를 사용할 수 있다.<br>10. 게시글 작성 시 Naver MAP으로 위치를 확인할 수 있다.<br>11. 게시글 작성 시 나의 반려동물 정보를 등록 및 불러올 수 있다.<br>12. 게시글 상세 보기를 클릭하면 게시글에 대한 자세한 내용을 볼 수 있다.<br>13. 게시글 상세 보기를 클릭하면 이미지를 드래그로 슬라이드 기능을 사용할 수 있다.<br>14. 게시글 상세 보기를 클릭하면 네이버 지도로 위치를 볼 수 있다.<br>15. 본인 게시글에 대하여 수정 및 삭제를 진행할 수 있다.|
|API|1. Daum Postcode - 우편번호, 도로명, 지번 주소 데이터를 얻어올 수 있으며, JSON 형식의 데이터를 리턴한다.<br>2. Naver Map - 네이버 지도에 위도, 경도를 기반으로 한 위치를 표시할 수 있으며, 위치 변경, 주소를 기반으로 한 위경도 추출, 위경도를 기반으로 한 주소 추출 작업을 할 수 있으며, JSON 형식의 데이터를 리턴한다.|
|Backend|[공용]<br>1. multer를 이용한 이미지 사진 등록 기능 구현<br>[Users]<br>1. 회원가입, 로그인, 회원 정보 수정, 회원 탈퇴 기능 제공<br>2. 사용자의 비밀번호는 암호화하여 저장(Bcrypt 이용)<br>3. 로그인 시 토큰을 생성(JWT 활용)<br>4. 생성된 토큰은 각종 기능의 사용자 인증에 활용(Mate 글쓰기, 회원 정보 조회 등)<br>[Animals]<br>1. 회원의 반려동물 정보 등록, 조회, 수정, 삭제 기능 제공<br>2. 등록한 반려동물 정보는 Mate 등에서 활용<br>[MateBoard]<br>1. 글 쓰기, 읽기, 수정, 삭제 기능 제공<br>2. 게시글 지역별 필터(시 단위, 구 단위), 날짜별 정렬 기능 제공<br>3. 게시글에 대하여 offset, limit을 이용한 페이지네이션 데이터 제공|
|Redis|1. 로그인 시 생성된 Token을 저장한다.<br>2. 로그아웃 시 저장 중인 Token을 삭제한다.<br>3. 저장된 Token은 사용자 인증이 필요한 부분에서 사용한다.|

<h3> 3. 프로젝트 기간 (Project Work) </h3>
Date: 2023-04-01 ~ 2023-07-05<br />
Members: 3 people<br />
Source Code Github Link: https://github.com/PetPotal/PetPotal

<h3> 프로젝트 팀원 </h3>

|박효현(FE)|박민재(BE)|이종민(FE)|
|:---:|:---:|:---:|
|<img src="https://avatars.githubusercontent.com/u/116782344?v=4" width="100" >|<img src="https://avatars.githubusercontent.com/u/20450971?v=4" width="100" >|<img src="https://avatars.githubusercontent.com/u/57649713?v=4" width="100" >|<a href="https://github.com/doch2130"><img src="https://img.shields.io/badge/GitHub-181717?style=plastic&logo=GitHub&logoColor=white"/></a>|<a href="https://github.com/Gruzam0615"><img src="https://img.shields.io/badge/GitHub-181717?style=plastic&logo=GitHub&logoColor=white"/></a>|<a href="https://github.com/tux31337"><img src="https://img.shields.io/badge/GitHub-181717?style=plastic&logo=GitHub&logoColor=white"/></a>| 

<h3> 4. 배포 사이트 </h3>
<a href="http://101.101.210.118:6300/"><img src="/frontend/src/assets/Logo.png" style="width: 200px;" alt='임시' /></a>

<h3> 5. 기술 스택 </h3>
<h3> Front-end </h3>
<div>
<img src="https://img.shields.io/badge/-React-blue"/>
<img src="https://img.shields.io/badge/-Recoil-turquoise"/>
<img src="https://img.shields.io/badge/-TanStack Query-red"/>
<img src="https://img.shields.io/badge/-TypeScript-blue"/>
</div>

<h3> Back-end </h3>

<div>
<img src="https://img.shields.io/badge/Node.js-339933?style=plastic&logo=Node.js&logoColor=white"/>
<img src="https://img.shields.io/badge/-MySQL-blue"/>
<img src="https://img.shields.io/badge/-Redis-red"/>
</div>

<h3> 6. ErDiagram</h3>
<img style="width: 700px" src="/frontend/src/assets/erd.png">


