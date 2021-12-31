import axios from "axios";
import {useEffect, useState} from "react";

function Gallery(){
  let [items, setItems] = useState([]);
  //팝업생성 관리할 state생성
  let [isPop, setIsPop] = useState(false);

  const api_key = "e7ed3b39fe112d7e93d03c19325305e0";
  const url = `https://www.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=${api_key}&per_page=10&format=json&nojsoncallback=1`;

  useEffect(()=>{
    axios
      .get(url)
      .then(json=>{
        console.log(json);
        setItems(json.data.photos.photo);
      })
  },[]);

  return (
    <main className="gallery">
      <div className="inner">
        <h1><a href="#">Gallery</a></h1>

        <section className="">
          {            
            items.map((item,index)=>{
              const imgSrc = `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`;

              return (
                <article key={index}>
                  <div className="inner">
                    <div className="pic" onClick={()=>{
                      setIsPop(true);
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
      {/* isPop 상태값이 true면 팝업 보임 */}
      { isPop ? <Pop /> : null }
      
    </main>    
  )

  //팝업생성하는 컴포넌트 함수 정의
  function Pop(){
    return (
      <aside className="pop">
        <span onClick={()=>{
          setIsPop(false);
        }}>Close</span>
      </aside>
    )
  }
}

export default Gallery;