
interface AouthButtonProps {
  styleName: string;
  image: string;
  imageAlt: string;
  text: string;
}

// export default function AouthButton(props:any) {
export default function AouthButton(props:AouthButtonProps) {
  return (
    <div>
      <button type='button' className={props.styleName}>
        <img src={props.image} alt={props.imageAlt} />
        <div>
          <span>{props.text}</span>
        </div>
      </button>
    </div>
  )
}
