import Script from 'next/script';
import { useEffect } from 'react';

const Map = ({ CLIENT_ID }: { CLIENT_ID: string }) => {
  const mapSetting = () => {
    try {
      if (!naver) return;
    } catch (error) {
      return;
    }

    const location = {
      x: 37.26737769181738,
      y: 127.03060404322764,
    };

    const map = new naver.maps.Map('map', {
      center: new naver.maps.LatLng(location.x, location.y),
      zoom: 16,
      zoomControl: true,
      zoomControlOptions: {
        style: naver.maps.ZoomControlStyle.SMALL,
        position: naver.maps.Position.TOP_RIGHT,
      },
    });

    const mark = new naver.maps.Marker({
      position: new naver.maps.LatLng(location.x, location.y),
      map: map,
      title: '더블케이미디어',
      icon: {
        url: 'http://static.naver.com/maps2/icons/pin_spot2.png',
      },
      animation: naver.maps.Animation.BOUNCE,
    });
  };

  useEffect(() => {
    mapSetting();
  }, []);

  return (
    <div id="map">
      <Script
        type="text/javascript"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${CLIENT_ID}`}
        strategy="beforeInteractive"
        onLoad={() => mapSetting()}
      ></Script>

      <style jsx>
        {`
          #map {
            width: 100%;
            height: 100%;
          }

          #map > span {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 20px;
            width: 100%;
            height: 100%;
          }
        `}
      </style>
    </div>
  );
};

export default Map;
