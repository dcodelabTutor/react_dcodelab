import React, { useEffect, useRef, useState } from 'react'

function Community() {
  const frame = useRef(null);
  const input = useRef(null);
  const [post, setPost] = useState('');
  const [postList, setPostlist] = useState([]);

  const insertPost = ()=>{
    setPostlist([...postList, post])     
  }

  useEffect(()=>{
    frame.current.classList.add('on');
    setPost('');
    console.log(postList);
  },[postList])

  return (
    <main ref={frame}>
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
          
        </section>
      </div>
    </main>
  )
}

export default Community;


