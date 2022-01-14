import { useEffect, useRef, useState } from "react";

function Location(){ 
  const {kakao} = window; 
  const container = useRef(null);
  const [map, setMap] = useState(null);
  //순서값을 index스테이트에 넣어서 관리
  const [index, setIndex] = useState(0); 
  const info = [
    {
      title : "본점", 
      latlng : new kakao.maps.LatLng(37.5132313,127.0594368),
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
      center: new kakao.maps.LatLng(37.5132313,127.0594368), 
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
  },[index]); //의존성에 index스테이트를 추가해 추후 순서값이 바뀔때마다 지도 다시 렌더링


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
          {/* 지점 버튼 클릭시 index state변경 */}
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