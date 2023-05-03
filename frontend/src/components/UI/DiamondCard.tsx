import style from './DiamondCard.module.css';

interface DiamondCardProps {
  key: number;
  iconImage: string;
  children: React.ReactNode;
}

export default function DiamondCard(props: DiamondCardProps) {
  return (
    <div className={style.diamondCardWrap}>
      <div className={style.diamondCard}>
        <img src={props.iconImage} alt={props.iconImage} />
      </div>
      <div className={style.diamondCardText}>
        {props.children}
      </div>
    </div>
  )
}
