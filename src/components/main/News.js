import { useEffect, useState } from "react/cjs/react.development";

function News(){
  
  const getLocalItems=()=>{
    let data = localStorage.getItem('posts');

    if(data){
      let result = JSON.parse(data);
      result = result.splice(0,6);
      return result;
    }else{
      return [
        {title: 'Hello0', content: 'Here comes description in detail.'},
        {title: 'Hello1', content: 'Here comes description in detail.'},  
        {title: 'Hello2', content: 'Here comes description in detail.'},  
        {title: 'Hello3', content: 'Here comes description in detail.'}    
      ];
    }
  }
  const [posts]= useState(getLocalItems);

  useEffect(()=>{
    localStorage.setItem('posts', JSON.stringify(posts));
  },[posts])
        
  return (
    <section id='news' className='myScroll'>
      <div className="inner">
        <h2>RECENT NEWS</h2>
        
        <div className="txtBox">
          {
            posts.map((post,index)=>{
              return (
                <article key={index}>
                  <h3>{post.title}</h3>
                  <p>{post.content}</p>
                </article>
              )
            })
          }
        </div>
      </div>
    </section>
  )
}

export default News;