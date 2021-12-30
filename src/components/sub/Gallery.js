import axios from "axios";
import {useEffect, useState} from "react";

function Gallery(){
  let [items, setItems] = useState([]);
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
    <main>
      <div className="inner">
        <h1><a href="#">Gallery</a></h1>

        <section>
          {            
            items.map((item,index)=>{
              const imgSrc = `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`;

              return (
                <article key={index}>
                  <div className="inner">
                    <div className="pic">
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
    </main>
  )
}

export default Gallery;