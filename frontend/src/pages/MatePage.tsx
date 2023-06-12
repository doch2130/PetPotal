import { useEffect } from "react";
import MateBoard from "../components/Mate/Board/MateBoard";

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
