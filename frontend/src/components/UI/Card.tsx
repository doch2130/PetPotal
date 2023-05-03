import style from './Card.module.css';

interface CardProps {
  key: number;
  children: React.ReactNode;
}

export default function Card(props:CardProps) {
  return (
    <div className={style.card}>
      {props.children}
    </div>
  )
}
