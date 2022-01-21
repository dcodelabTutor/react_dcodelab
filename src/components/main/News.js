import { useEffect, useState } from "react/cjs/react.development";

function News(){

  const basic = [        
    {title: 'Hello1', content: 'Here comes description in detail.'},  
    {title: 'Hello2', content: 'Here comes description in detail.'},  
    {title: 'Hello3', content: 'Here comes description in detail.'},  
    {title: 'Hello4', content: 'Here comes description in detail.'},  
    {title: 'Hello5', content: 'Here comes description in detail.'},  
    {title: 'Hello6', content: 'Here comes description in detail.'}      
  ];  


  const getLocalItems=()=>{
    let data = localStorage.getItem('posts');

    if(data){
      return JSON.parse(data);
    }else{
      return basic;
    }
  }
  const [posts]= useState(getLocalItems); 
  const [conut, setCount] = useState(0);


  useEffect(()=>{
    localStorage.setItem('posts', JSON.stringify(posts));   
  },[])
        
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