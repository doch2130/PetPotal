// import React from 'react'
import { useEffect, useState } from 'react';
import style from './PictureBox.module.css';

interface PictureBoxProps {
  width: string;
  height: string;
  children: React.ReactNode;
}

export default function PictureBox(props:PictureBoxProps) {
  const boxSize = {
    width: props.width,
    height: props.height
  }


  // const [mouseDownClientX, setMouseDownClientX] = useState(0);
  // const [mouseDownClientY, setMouseDownClientY] = useState(0);
  // const [mouseUpClientX, setMouseUpClientX] = useState(0);
  // const [mouseUpClientY, setMouseUpClientY] = useState(0);

  // const onMouseDown = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
  //   setMouseDownClientX(e.clientX);
  //   setMouseDownClientY(e.clientY);
  // };
  // const onMouseUp = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
  //   setMouseUpClientX(e.clientX);
  //   setMouseUpClientY(e.clientY);
  // };
  
  // useEffect(() => {
  //   const dragSpaceX = Math.abs(mouseDownClientX - mouseUpClientX);
  //   const dragSpaceY = Math.abs(mouseDownClientY - mouseUpClientY);
  //   const vector = dragSpaceX / dragSpaceY;

  //   if (mouseDownClientX !== 0 && dragSpaceX > 100 && vector > 2) {
  //     if (mouseUpClientX < mouseDownClientX) {
  //       // handleNextBtn();
  //       console.log('next');
  //     } else if (mouseUpClientX > mouseDownClientX) {
  //       // handlePrevBtn();
  //       console.log('prev');
  //     }
  //   }
  // }, [mouseUpClientX]);

  return (
    // <div className={style.wrap} style={boxSize} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
    <div className={style.wrap} style={boxSize}>
      {props.children}
    </div>
  )
}
