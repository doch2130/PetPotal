import { useEffect, useRef } from 'react'

const { naver } = window;

export default function MapTest() {
  const mapElement = useRef(null);

  useEffect(() => {
    if (!mapElement.current || !naver) return;

    // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
    // backend 좌표 입력 시 LatLng(y, x)
    const location = new naver.maps.LatLng(37.5533104, 126.9640440);
    const mapOptions: naver.maps.MapOptions = {
      center: location,
      zoom: 15,
      // zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    };
    const map = new naver.maps.Map(mapElement.current, mapOptions);
    new naver.maps.Marker({
      position: location,
      map,
    });
  }, []);


  return (
    <div ref={mapElement} style={{ minHeight: '300px' }} />
  );
}


