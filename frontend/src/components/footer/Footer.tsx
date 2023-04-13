// import React from 'react'
import { Link } from 'react-router-dom';
import style from './Footer.module.css';

const footTextArray = [
  ['PetPotal', 'Service', 'About', 'Contact'],
  ['Mate', 'Hospital', 'Beauty', 'Hoteling', 'Hotel', 'Food'],
  ['Follow Us', 'Twitter', 'Instagram', 'Facebook'],
];

export default function Footer() {
  return (
    <div className={style.wrap}>
      <div className={style.row}>
        <hr />
      </div>

      <div className={style.row}>
        <div className={style.col}>
          <h1 className={style.footLogo}>
            <span>
              <Link to='/'>Pet Potal</Link>
            </span>
          </h1>
        </div>
        <div className={style.col}>
          <div className={style.row}>
            {footTextArray.map((footText, index) => 
              <div className={style.col + ' ' + style.footText} key={index}>
                <ul>
                  {footText.map((el) => 
                  <li key={el}>{el}</li>
                  )}
                </ul>
              </div>
            )}
            <div className={style.col + ' ' + style.footText}></div>
          </div>
        </div>
      </div>
      
      <div className={style.row}>
        <div className={style.col}>
          <p className={style.copyright}>© 2023 PetPotal</p>
        </div>
      </div>
    </div>
  )
}
