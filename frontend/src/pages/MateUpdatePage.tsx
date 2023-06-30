import { useEffect } from 'react';
import MateUpdate from '../components/Mate/Update/MateUpdate';

export default function MateUpdatePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <MateUpdate />
    </div>
  )
}


