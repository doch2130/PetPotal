// import React from 'react'
import style from './SeventhSection.module.css';
import HotelImg1 from '../../assets/mainpage/Hotel/MainPage_Hotel_Check_Img_1.png';
import HotelImg2 from '../../assets/mainpage/Hotel/MainPage_Hotel_Check_Img_2.png';
import PlusIcon from '../../assets/icon/plus.png';
import MinusIcon from '../../assets/icon/minus.png';

export default function SeventhSection() {
  return (
    <div className={style.wrap}>
      <div className={style.wrapCol}>
        <div className={style.wrapLeft}>
          <h1>Hoteling</h1>
          <p>To keep pets from being lonely<br />
          You can find accommodations that you can go with.</p>
        </div>
      </div>

      <div className={style.wrapCol}>
        <div className={style.wrapRight}>
          <div className={style.box}>
            <div className={style.boxTop}>
              <div className={style.boxLeft}>
                <div className={style.boxFlex}>
                  <div>
                    <p>Check-In</p>
                  </div>
                  <div></div>
                </div>
                <div className={style.boxFlex}>
                  <div>
                    <img src={HotelImg2} alt='Hotel Img2' />
                  </div>
                  <div>
                    <p>Sunday,</p>
                    <p>30 Apr</p>
                  </div>
                </div>
              </div>

              <div className={style.boxRight}>
                <div className={style.boxFlex}>
                    <div>
                      <p>Check-Out</p>
                    </div>
                    <div></div>
                  </div>
                  <div className={style.boxFlex}>
                    <div>
                      <img src={HotelImg1} alt='Hotel Img1' />
                    </div>
                    <div>
                      <p>Friday,</p>
                      <p>5 May</p>
                    </div>
                  </div>
              </div>
            </div>

            <div className={style.boxBottom}>
              <div className={style.boxLeft}>
                <div className={style.boxFlex}>
                  <div>
                    <p>Number of People</p>
                  </div>
                  <div></div>
                </div>
                <div className={style.boxFlex}>
                  <div>
                    <p>2</p>
                  </div>
                  <div>
                    <div>
                      <img src={PlusIcon} alt='Plus Icon' />
                    </div>
                    <div>
                      <img src={MinusIcon} alt='Minus Icon' />
                    </div>
                  </div>
                </div>
              </div>

              <div className={style.boxRight}>
                <div className={style.boxFlex}>
                  <div>
                    <p>Location</p>
                  </div>
                  <div></div>
                </div>

                <div className={style.boxFlex}>
                  <div>
                    <p>Jung-gu, Seoul</p>
                  </div>
                </div>
              </div>
            </div>



            <div className={style.boxButton}>
              <span>Go To Page</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
