// import React from 'react'

import { Link } from "react-router-dom";

export default function MatePage() {
  return (
    <div>
      <h1>MatePage</h1>
      <Link to='/mate/write'>글쓰기</Link>
      <br />
      <Link to='/mate/detail/1'>글보기</Link>
    </div>
  )
}
