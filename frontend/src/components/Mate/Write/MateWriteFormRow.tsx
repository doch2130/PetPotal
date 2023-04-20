
interface MateWriteFormProps {
  styleWrapRow: string;
  styleWrapCol: string;
  id: string;
  text: string;
  children: React.ReactNode;
}

export default function MateWriteFormRow(props:MateWriteFormProps) {
  return (
    <div className={props.styleWrapRow}>
        <div className={props.styleWrapCol}>
          <label htmlFor={props.id}>{props.text}</label>
          {props.children}
        </div>
      </div>
      
  )
}
