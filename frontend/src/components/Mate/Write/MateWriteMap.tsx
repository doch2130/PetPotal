import { useEffect, useRef } from 'react'

const { naver } = window;

interface naverMap {
  height: string;
  mapData: latlng;
}

interface latlng {
  x: number;
  y: number;
  _lng: number;
  _lat: number;
}

export default function MateWriteMap(props:naverMap) {
  const mapElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapElement.current || !naver) return;

    // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
    // backend 좌표 입력 시 LatLng(y, x)
    // const location = new naver.maps.LatLng(37.5533104, 126.9640440);
    const location = new naver.maps.LatLng(props.mapData.y, props.mapData.x);
    const mapOptions: naver.maps.MapOptions = {
      center: location,
      zoom: 15,
      zoomControl: true,
      zoomControlOptions: {
        style: naver.maps.ZoomControlStyle.SMALL,
        position: naver.maps.Position.TOP_RIGHT
    }
    };

    const map = new naver.maps.Map(mapElement.current, mapOptions);

    const marker = new naver.maps.Marker({
      position: location,
      map,
    });

    const InfoWindowOptions: naver.maps.InfoWindowOptions = {
      content: '',
      maxWidth: 250,
      borderWidth: 2,
      anchorSkew: true,
    }
    const infoWindow = new naver.maps.InfoWindow(InfoWindowOptions);

    // const initData = {
    //   x: 126.9640440,
    //   y: 37.5533104,
    //   _lng: 126.9640440,
    //   _lat: 37.5533104,
    // }
    // console.log('props.mapData ', props.mapData);
    // searchCoordinateToAddress(initData);
    searchCoordinateToAddress(props.mapData);
    
    naver.maps.Event.addListener(map, 'click', function(e) {
      infoWindow.close();
      marker.setPosition(e.coord);
      searchCoordinateToAddress(e.coord);
    });

    naver.maps.Event.addListener(marker, 'click', function() {
      if (infoWindow.getMap()) {
        infoWindow.close();
      } else {
        infoWindow.open(map, marker);
      }
    });

    function searchCoordinateToAddress(latlng:latlng) {
      // console.log('latlng ', latlng);
      naver.maps.Service.reverseGeocode({
          coords: latlng,
          orders: [
              naver.maps.Service.OrderType.ADDR,
              naver.maps.Service.OrderType.ROAD_ADDR
          ].join(',')
      }, function(status, response) {
          if (status === naver.maps.Service.Status.ERROR) {
              return alert('Something Wrong!');
          }
  
          let items = response.v2.results,
              address = '',
              htmlAddresses = [];
  
          for (let i=0, ii=items.length, item, addrType; i<ii; i++) {
              item = items[i];
              address = makeAddress(item) || '';
              addrType = item.name === 'roadaddr' ? '[도로명 주소]' : '[지번 주소]';
  
              htmlAddresses.push((i+1) +'. '+ addrType +' '+ address);
          }
  
          infoWindow.setContent([
              '<div style="padding:5px;min-width:200px;line-height:150%;font-size: 12px;">',
              htmlAddresses.join('<br />'),
              '</div>'
          ].join('\n'));
      });
    }

    function makeAddress(item:any) {
      if (!item) {
          return;
      }
  
      const name = item.name,
          region = item.region,
          land = item.land,
          isRoadAddress = name === 'roadaddr';
  
      let sido = '', sigugun = '', dongmyun = '', ri = '', rest = '';
  
      if (hasArea(region.area1)) {
          sido = region.area1.name;
      }
  
      if (hasArea(region.area2)) {
          sigugun = region.area2.name;
      }
  
      if (hasArea(region.area3)) {
          dongmyun = region.area3.name;
      }
  
      if (hasArea(region.area4)) {
          ri = region.area4.name;
      }
  
      if (land) {
          if (hasData(land.number1)) {
              if (hasData(land.type) && land.type === '2') {
                  rest += '산';
              }
  
              rest += land.number1;
  
              if (hasData(land.number2)) {
                  rest += ('-' + land.number2);
              }
          }
  
          if (isRoadAddress === true) {
              if (checkLastString(dongmyun, '면')) {
                  ri = land.name;
              } else {
                  dongmyun = land.name;
                  ri = '';
              }
  
              if (hasAddition(land.addition0)) {
                  rest += ' ' + land.addition0.value;
              }
          }
      }
  
      return [sido, sigugun, dongmyun, ri, rest].join(' ');
    }

    function hasArea(area:any) {
      return !!(area && area.name && area.name !== '');
    }
    
    function hasData(data:string) {
        return !!(data && data !== '');
    }
    
    function checkLastString (word:string, lastString:string) {
        return new RegExp(lastString + '$').test(word);
    }
    
    function hasAddition (addition:any) {
        return !!(addition && addition.value);
    }

  }, []);

  return (
    <div ref={mapElement} style={{ minHeight: props.height }} />
  );
}
