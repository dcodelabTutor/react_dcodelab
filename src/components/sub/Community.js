import React, { useEffect, useRef, useState } from 'react';

function Community() { 
  const frame = useRef(null);
  const input = useRef(null);
  const textarea = useRef(null);
  const showBox = useRef(null);

  const [posts, setPosts] = useState([
    {title: 'Hello', content: 'Here comes description in detail.'}
  ]);

  useEffect(()=>{
    frame.current.classList.add('on');
  },[]);

  return (
    <main ref={frame} className='community content'>
      <div className="inner">
        <h1>Community</h1>

        <section className="inputBox">
          <input type="text" placeholder='제목을 입력하세요' ref={input} /><br />
          <textarea cols="30" rows="10" placeholder='본문을 입력하세요' ref={textarea}></textarea><br />
          <button onClick={()=>{
            input.current.value='';
            textarea.current.value='';
          }}>cancel</button>
          <button>create</button>
        </section>

        <section className="showBox" ref={showBox}>
          {
            posts.map((post, index)=>{
              return (
                <article key={index}>
                  <h2>{post.title}</h2>
                  <p>{post.content}</p>
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


