import { Link } from "react-router-dom";
import MateBoard from "../components/Mate/Board/MateBoard";
import { useEffect } from "react";

export default function MatePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <MateBoard />
    </div>
  )
}
