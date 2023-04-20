// import React from 'react'
import style from './MainBeauty.module.css';
import BeautyImg1 from '../../../assets/mainpage/Beauty/MainPage_Beauting_Img_1.jpg';
import BeautyImg2 from '../../../assets/mainpage/Beauty/MainPage_Beauting_Img_2.jpg';
import BeautyImg3 from '../../../assets/mainpage/Beauty/MainPage_Beauting_Img_3.jpg';
import BeautyImg4 from '../../../assets/mainpage/Beauty/MainPage_Beauting_Img_4.jpg';

export default function MainBeauty() {
  return (
    <div className={style.wrap}>
      <div className={style.wrapCol}>
        <div className={style.wrapLeft}>
          <h1>Beauty</h1>
          <p>Find a store that gives beauty to your pet more than other friends!</p>
          <button>
            Find a Beauty Shop
          </button>
        </div>
      </div>

      <div className={style.wrapCol}>
        <div className={style.wrapRight}>
          <div className={style.wrapRightTop}>
            <img src={BeautyImg1} alt='BeautyImg1' className={style.beautyImg} />
            <img src={BeautyImg2} alt='BeautyImg2' className={style.beautyImg} />
          </div>
          <div className={style.wrapRightBottom}>
            <img src={BeautyImg3} alt='BeautyImg3' className={style.beautyImg} />
            <img src={BeautyImg4} alt='BeautyImg4' className={style.beautyImg} />
          </div>
        </div>
          {/* <div className={style.imgSource}>
            <a href="https://kr.freepik.com/free-photo/cat-s-getting-a-nail-trim_17094543.htm#from_view=detail_alsolike">작가 artursafronovvvv</a> 출처 Freepik
          </div>
          <div className={style.imgSource}>
            <a href="https://kr.freepik.com/free-photo/vet-with-a-brush-for-animals-woman-in-a-black-t-shirt-cat-on-a-couch_13320861.htm#query=애견 미용실&position=13&from_view=search&track=ais">작가 prostooleh</a> 출처 Freepik
          </div>
          <div className={style.imgSource}>
            <a href="https://kr.freepik.com/free-photo/haircuting-process-small-dog-sits-on-the-table-dog-with-a-professional_17066244.htm#query=애견 미용실&position=15&from_view=search&track=ais">작가 prostooleh</a> 출처 Freepik
          </div>
          <div className={style.imgSource}>
            <a href="https://kr.freepik.com/free-photo/big-black-dog-getting-procedure-at-the-groomer-salon-young-woman-in-white-tshirt-combing-a-dog-dog-is-tied-on-a-blue-table_24440752.htm#from_view=detail_alsolike">작가 prostooleh</a> 출처 Freepik
          </div> */}
      </div>

    </div>
  )
}
