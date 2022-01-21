import {useEffect, useState, useRef} from 'react';
import {useSelector} from 'react-redux';

function Youtube(){
  const frame = useRef(null);
  let [isPop, setIsPop] = useState(false);
  let [index, setIndex] = useState(0);

  const youtube = useSelector(state=>state);
  const vidData = youtube.youtubeReducer.youtube;  

  useEffect(()=>{    
    frame.current.classList.add('on');
  },[]);

  return (
    <main className="youtube" ref={frame}>
      <div className="inner">
        <h1><a href="#">Youtube</a></h1>

        <section className="frame">
          {            
            vidData.map((item, index)=>{
              let tit = item.snippet.title;
              let tit_len = tit.length;
              let desc = item.snippet.description;
              let desc_len = desc.length;              

              return (
                <article key={index}>
                  <div className="inner">  
                    <div className="txt">
                      <h2>{(tit_len > 30) ? tit =  tit.substr(0,30)+"..." : tit}</h2>
                      <p>{(desc_len > 150) ? desc =  desc.substr(0,150)+"..." : desc}</p>
                    </div>
                    <div className="pic" onClick={()=>{
                      setIsPop(true);
                      setIndex(index);
                    }}>
                      <img src={item.snippet.thumbnails.medium.url} />                      
                    </div>
                  </div>
                </article>
              )
            })
          }
        </section>

        {isPop ? <Pop /> : null}
      </div>
    </main>
  )

  function Pop(){    
    return (
      <aside className="pop">
        <iframe 
          src={"https://www.youtube.com/embed/"+vidData[index].snippet.resourceId.videoId}  width='100%' height='100%' allowFullScreen
        ></iframe>
        <span onClick={()=>{
          setIsPop(false);
        }}>close</span>
      </aside>
    )
  }
}

export default Youtube;