import { useEffect, useRef, useState } from "react";

function Location(){ 
  const {kakao} = window; 
  const container = useRef(null);
  const [map, setMap] = useState(null);
  //state에 담을 초기 정보값
  const info = [
    {
      title : "본점", 
      latlng : new kakao.maps.LatLng(37.5132313,127.0594368),
      //public폴더 안쪽의 절대경로와 이미지 주소 연결
      imgSrc : process.env.PUBLIC_URL+"/img/marker1.png", 
      imgSize : new kakao.maps.Size(232, 99),
      imgPos : {offset: new kakao.maps.Point(116, 99)}
    },
    {
      title : "지점1", 
      latlng : new kakao.maps.LatLng(37.507099899564444,126.75639338893572),
      imgSrc : process.env.PUBLIC_URL+"/img/marker2.png", 
      imgSize : new kakao.maps.Size(232, 99),
      imgPos : {offset: new kakao.maps.Point(116, 99)}
    },
    {
      title : "지점2", 
      latlng : new kakao.maps.LatLng(35.17422705914147,129.10766665201712),
      imgSrc : process.env.PUBLIC_URL+"/img/marker3.png", 
      imgSize : new kakao.maps.Size(232, 99),
      imgPos : {offset: new kakao.maps.Point(116, 99)}
    }
  ];

  const [mapInfo, setMapInfo] = useState(info[0]);

  useEffect(()=>{
    const options = { 
      center: new kakao.maps.LatLng(37.5132313,127.0594368), 
      level: 3 
    }
  
    const map = new kakao.maps.Map(container.current, options);
    setMap(map);

    //마커 인스턴스 호출 (호출시 mapInfo라는 state에서 정보값 호출)
    new kakao.maps.Marker({
      map: map, 
      position: mapInfo.latlng, 
      title : mapInfo.title,
      image : new kakao.maps.MarkerImage(mapInfo.imgSrc, mapInfo.imgSize, mapInfo.imgPos)
    });
  },[]);

  return (
    <main className='location'>
      <div className="inner">
        <h1>Location</h1>
      
        <div id="map" ref={container}></div>

        <ul className="traffic">
          <li onClick={()=>{           
            map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
          }}>교통정보 보기</li>

          <li onClick={()=>{
            map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);  
          }}>교통정보 끄기</li>
        </ul>
      </div>
    </main>
  )
}

export default Location;