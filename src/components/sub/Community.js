import React, { useEffect, useRef, useState } from 'react';

function Community() { 
  const frame = useRef(null);
  const input = useRef(null);
  const textarea = useRef(null);
  const updateInput = useRef(null);
  const updateTextarea = useRef(null);
  const showBox = useRef(null);
 
  const getLocalItems=()=>{
    let data = localStorage.getItem('posts');

    if(data){
      return JSON.parse(data);
    }else{
      return [
        {title: 'Hello0', content: 'Here comes description in detail.'},
        {title: 'Hello1', content: 'Here comes description in detail.'},  
        {title: 'Hello2', content: 'Here comes description in detail.'},  
        {title: 'Hello3', content: 'Here comes description in detail.'}    
      ];
    }
  }
  const [posts, setPosts]= useState(getLocalItems);
 

  const createPost=()=>{
    if(!input.current.value || !textarea.current.value){
      alert('제목과 본문을 입력하세요');
      return;
    }
    setPosts([
      {
        title: input.current.value,
        content: textarea.current.value
      }
      ,...posts
    ]);

    input.current.value='';
    textarea.current.value='';
  }
  
  const deletePost=index=>{
    setPosts(
      posts.filter((_, postIndex)=> postIndex !== index)
    )  
  }

  const enableUpdate=index=>{
    setPosts(
      posts.map((post, postIndex)=>{
        if(postIndex===index) post.enableUpdate=true;
        return post;
      })
    )  
  }

  const disableUpdate=index=>{
    setPosts(
      posts.map((post, postIndex)=>{
        if(postIndex===index) post.enableUpdate=false;
        return post;
      })
    )
  }

  const updatePost=index=>{
    if(!updateInput.current.value || !updateTextarea.current.value){
      alert('수정할 제목과 본문을 모두 입력하세요.');
      return;
    }
    setPosts(
      posts.map((post, postIndex)=>{
        if(postIndex === index){       
          post.title = updateInput.current.value;
          post.content = updateTextarea.current.value;
          post.enableUpdate = false;
        }
        return post;
      })
    )
  }

  useEffect(()=>{
    localStorage.setItem('posts', JSON.stringify(posts));
    frame.current.classList.add('on');
  },[posts]);

  return (
    <main ref={frame} className='community content'>
      <div className="inner">
        <h1>Community</h1>

        <section className="inputBox">
          <input 
            type="text" 
            placeholder='제목을 입력하세요' 
            ref={input} 
          /><br />

          <textarea 
            cols="30" rows="5" 
            placeholder='본문을 입력하세요' 
            ref= {textarea}
          >
          </textarea><br />

          <button onClick={()=>{
            input.current.value='';
            textarea.current.value='';
          }}>cancel</button>

          <button onClick={createPost}>create</button>
        </section>

        <section className="showBox" ref={showBox}>
          {
            posts.map((post, index)=>{
              return (
                <article key={index}>
                  {
                    post.enableUpdate
                    ?
                    // 수정모드
                    <>
                      <div className="post">
                        <input type="text" defaultValue={post.title} ref={updateInput} /><br />
                        <textarea defaultValue={post.content} ref={updateTextarea}></textarea>   
                      </div>

                      <ul className="btns">
                        <li onClick={()=>updatePost(index)}>입력</li>
                        <li onClick={()=>disableUpdate(index)}>취소</li>
                      </ul>
                    </>
                    :
                    // 출력모드
                    <>
                      <div className="post">
                        <h2>{post.title}</h2>
                        <p>{post.content}</p> 
                      </div>

                      <ul className="btns">
                        <li onClick={()=>enableUpdate(index)}>수정</li>
                        <li onClick={()=>deletePost(index)}>삭제</li>
                      </ul>
                    </>
                  }                  
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


