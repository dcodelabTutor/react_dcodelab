import axios from 'axios';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setYoutube } from '../../redux/actions';


function Info(){
  const youtube = useSelector(state=>state);
  const dispatch = useDispatch();
  const vidData = youtube.youtubeReducer.youtube;
  console.log(vidData);

  //youtube api호출시 url옵션값
  const api_key = "AIzaSyB7VIAECTixPlj0sr-goHwkmNRFIwxZntA";
  const playListId = "PLGOVj4gmzJyBMQSKPpBoycEvgXVFPMRZV";
  const num = 10;
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${api_key}&playlistId=${playListId}&maxResults=${num}`;

  //youtube데이터를 axio로 호출해서 dispatch를 통해 reducer에 전달하는 함수 정의
  const fetchYoutube = async ()=>{
    const response = await axios
      .get(url)
      .catch(err=>console.error(err))  
    dispatch(setYoutube(response.data.items));
  }  

  //컴포넌트 생성시 fetchYoutube를 호출에 reducer에 해당 데이터 전달
  useEffect(()=>{
    fetchYoutube();
  },[]);

  return (
    <section id="info" className='myScroll'>
      <div className="inner">
        <h2>Recent YOUTUBE</h2>
        <div className="vidBox">
          {
            vidData.map((vid,index)=>{
              if(index<4){
                return (
                  <img key={index} src={vid.snippet.thumbnails.medium.url} />
                )
              }
              
            })
          }
        </div>
      </div>
    </section>
  )
}

export default Info;