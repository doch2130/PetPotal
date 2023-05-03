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

  return (
    <div className={style.wrap} style={boxSize}>
      {props.children}
    </div>
  )
}
