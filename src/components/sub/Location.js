import { useEffect, useRef, useState } from "react";

function Location(){ 
  const frame = useRef(null);
  const {kakao} = window; 
  const container = useRef(null);
  const btnBranch = useRef(null);
  const [map, setMap] = useState(null);  
  const [index, setIndex] = useState(0); 
  const [toggle, setToggle] = useState(false);
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

  const [mapInfo] = useState(info);

  useEffect(()=>{
    console.log('map');
    console.log(index);
    frame.current.classList.add('on');
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
  
    const mapTypeControl = new kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);  
    map.setZoomable(true); 
    map.setDraggable(true);

    for(const btn of btnBranch.current.children) btn.classList.remove('on');
    btnBranch.current.children[index].classList.add('on');
    
    
    const mapSet = ()=> map.setCenter(mapInfo[index].latlng);  
    window.addEventListener('resize',mapSet);
    
    return ()=>{
      window.removeEventListener('resize',mapSet);
      //컴포넌트가 사라질때마다 container안쪽의 기존 지도내용은 삭제
      //마우스휠 이벤트로 zoom 설정시 밑에쪽에 기존 지도 표시문제 해결
      container.current.innerHTML='';
    } 
   
  },[index]); 

  return (
    <main className='location' ref={frame}>
      <div className="inner">
        <h1>Location</h1>
      
        <div id="map" ref={container}></div>

        <ul className="traffic">
          { 
            toggle ? 
              <li onClick={()=>{
                map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC); 
                setToggle(!toggle);
              }}>교통정보 끄기</li>       
            :            
              <li onClick={()=>{           
                map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
                setToggle(!toggle);
              }}>교통정보 보기</li>
          } 
        </ul>

        <ul className="branch" ref={btnBranch}> 
        {  
          mapInfo.map((data,index)=>{
            return  <li key={index} onClick={()=>setIndex(index)}>{data.title}</li>
          })          
        }  
        </ul>
      </div>
    </main>
  )
}

export default Location;