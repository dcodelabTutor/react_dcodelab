/*
  1. 유튜브 서버로부터 데이터 요청을 해서 전달받은 데이터를 state에 옮겨담기
  2. 해당 state값을 활용해서 동적으로 가상돔 생성
  3. 각각의 가상DOM요소 클릭시 레이어팝업 동적으로 생성
  4. 해당 레이어팝업 안쪽에 데이터와, 순서관련 state값을 활용해서 세부 컨텐츠 출력
*/
import axios from 'axios';
import {useEffect, useState} from 'react';

function Youtube(){
  let [data, setData] = useState([]);

  const api_key = "AIzaSyB7VIAECTixPlj0sr-goHwkmNRFIwxZntA";
  const playListId = "PLYOPkdUKSFgX5CgKf68RJzJHec0XEdBNd";
  const num = 4;
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${api_key}&playlistId=${playListId}&maxResults=${num}`; 

  useEffect(()=>{
    axios
      .get(url)
      .then(json=>{
        console.log(json.data.items);
        setData(json.data.items);        
      }) 
  },[]);

  return (
    <main>
      <div className="inner">
        <h1><a href="#">Youtube</a></h1>

        <section className="frame">
          {
            
            data.map((item, index)=>{
              let tit = item.snippet.title;
              let tit_len = tit.length;

              let desc = item.snippet.description;
              let desc_len = desc.length;
              

              return (
                <article key={index}>
                  <div className="inner">
                    <div className="pic">
                      <img src={item.snippet.thumbnails.medium.url} />
                      <h2>{(tit_len > 40) ? tit =  tit.substr(0,40)+"..." : tit}</h2>
                      <p>{(desc_len > 150) ? desc =  desc.substr(0,250)+"..." : desc}</p>
                    </div>
                  </div>
                </article>
              )
            })
          }
        </section>
      </div>
    </main>
  )
}

export default Youtube;