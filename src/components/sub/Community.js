import React, { useEffect, useRef, useState } from 'react'

function Community() {
  const frame = useRef(null);
  const input = useRef(null);
  const [post, setPost] = useState('');
  const [postList, setPostlist] = useState([]);

  const insertPost = ()=>{
    setPostlist([...postList, post])     
  }

  const deletePost = delIndex =>{
    setPostlist(
      postList.filter((post, index)=> (index !== delIndex))
    )
  }

  useEffect(()=>{
    frame.current.classList.add('on');   
    setPost('');  
  },[postList])

  return (
    <main ref={frame} className='community content'>
      <div className="inner">
        <h1>Community</h1>

        <section className="inputBox">
          <input 
            ref={input}
            type="text" 
            value= {post}    
            onChange={e=> setPost(e.target.value)}
          />   
          <button
            onClick ={insertPost}
          >save
          </button>
        </section>

        <section className="showList">
          {
            //기존 배열값을 역순으로 화면에 출력
            postList.map((post, index)=>{
              return (
                <article
                  key={index}
                >
                  <p>{post}</p>
                  <span 
                    onClick={()=> deletePost(index)}
                  >del</span>
                </article>
              )
            })
          }
        </section>
      </div>
    </main>
  )
}

export default Community;


