import { Link } from "react-router-dom";
import MateBoard from "../components/Mate/Board/MateBoard";

export default function MatePage() {
  return (
    <div>
      <MateBoard />
      <br />
      <Link to='/mate/write'>글쓰기</Link>
      <br />
      <Link to='/mate/detail/1'>글보기</Link>
    </div>
  )
}
