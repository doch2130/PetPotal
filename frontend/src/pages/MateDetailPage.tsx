import { useEffect } from 'react';
import MateDetail from '../components/Mate/View/MateDetail';

export default function MateDetailPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div>
      <MateDetail />
    </div>
  )
}
