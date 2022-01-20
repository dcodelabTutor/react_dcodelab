function News(){
  
  const getLocalItems=()=>{
    let data = localStorage.getItem('posts');
    
    if(data){
      let result = JSON.parse(data);
      result = result.splice(0,6);
      return result;
    }else{
      return [];
    }
  }

  const posts = getLocalItems();
  console.log(posts);
        
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