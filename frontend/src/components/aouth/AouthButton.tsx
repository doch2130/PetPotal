// import React from 'react'

export default function AouthButton(props:any) {
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
