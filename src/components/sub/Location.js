import { useEffect, useRef, useState } from "react";

function Location(){ 
  const {kakao} = window; 
  const container = useRef(null);
  const [map, setMap] = useState(null);  
  const [index, setIndex] = useState(0); 
  const info = [
    {
      title : "본점", 
      latlng : new kakao.maps.LatLng(37.48771318663092,126.75344867275281),
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

  const [mapInfo, setMapInfo] = useState(info);

  useEffect(()=>{
    const options = { 
      center: mapInfo[index].latlng, 
      level: 3 
    }  
    const map = new kakao.maps.Map(container.current, options);
    setMap(map);
 
    new kakao.maps.Marker({
      map: map, 
      position: mapInfo[index].latlng, 
      title : mapInfo[index].title,
      image : new kakao.maps.MarkerImage(mapInfo[index].imgSrc, mapInfo[index].imgSize, mapInfo[index].imgPos)
    });

    map.setCenter(mapInfo[index].latlng); 
  
    //지도 타입변경 패널 프레임에 생성
    const mapTypeControl = new kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
    //휠로 줌 기능 활성화
    map.setZoomable(true);
    //마우스 드래그기능 활성화
    map.setDraggable(true);
    
    
    const mapSet = ()=> map.setCenter(mapInfo[index].latlng);   
    //윈도우 리사이즈시 마커 위치 중앙배치 
    window.addEventListener('resize',mapSet);

    //해당 컴포넌트가 사라질떄 기존 window에 등록된 이벤트 제거
    return ()=> window.removeEventListener('resize',mapSet);
   
  },[index]); 


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

        <ul className="branch">        
          <li onClick={()=>{          
            setIndex(0);
          }}>본점</li>

          <li onClick={()=>{          
            setIndex(1)
          }}>지점1</li>

          <li onClick={()=>{       
            setIndex(2)
          }}>지점2</li>
        </ul>
      </div>
    </main>
  )
}

export default Location;