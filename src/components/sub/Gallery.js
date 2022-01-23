import {useEffect, useState, useRef} from "react";
import {useSelector} from 'react-redux';

const body = document.querySelector("body");

function Gallery(){
  const frame = useRef(null);  
  let [isPop, setIsPop] = useState(false);
  let [index, setIndex] = useState(0);

  const flickr = useSelector(state=>state);
  const picData = flickr.flickrReducer.flickr; 
 

  useEffect(()=>{ 
      frame.current.classList.add('on');
  },[]);

  return (
    <main className="gallery" ref={frame}>
      <div className="inner">
        <h1><a href="#">Gallery</a></h1>

        <section className="">
          {            
            picData.map((item,index)=>{
              const imgSrc = `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`;

              return (
                <article key={index}>
                  <div className="inner">
                    <div className="pic" onClick={()=>{
                      setIsPop(true);
                      //버튼 클릭시 index state변경
                      setIndex(index);
                      console.log(index);
                    }}>
                      <img src={imgSrc} />
                    </div>

                    <h2>{item.title}</h2>
                  </div>
                </article>
              )              
            })
          }
        </section>
        
      </div>
      { isPop ? <Pop /> : null }
      
    </main>    
  )

  function Pop(){   
    const imgSrc = `https://live.staticflickr.com/${picData[index].server}/${picData[index].id}_${picData[index].secret}_b.jpg`;

    useEffect(()=>{
      console.log("pop 생성")
      body.style.overflow = "hidden";

      return ()=>{
        console.log("pop 제거");
        body.style.overflow = "auto";
      }
    },[]);

    return (
      <aside className="pop">    
        <img src={imgSrc} /> 
        <p>{picData[index].title}</p>
        <span onClick={()=>{
          setIsPop(false);
        }}>Close</span>
      </aside>
    )
  }
}

export default Gallery;