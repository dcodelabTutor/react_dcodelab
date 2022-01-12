import { useEffect, useState } from "react";

function Join(){
  const initVal={
    userid : '' ,
    email: ''  
  }
  const [val, setVal] = useState(initVal);
  const [err, setErr] = useState({});

  const handleChange = e => {   
    const {name, value} = e.target;     
    setVal({...val, [name]: value}); 
  }

  //submit이벤트 발생하면 실행되는 함수
  const handleSubmit = e =>{ 
    e.preventDefault();   
    setErr(check(val));  
  }

  //에러 객체를 반환하는 함수
  const check = val=>{
    let errs = {};  
    if( !val.userid || val.userid.length <5 ){
      errs.userid='아이디 5글자 이상입력';
    } 
    if( !val.email || val.email.length <8 ){
      errs.email='이메일주소를 8글자 이상입력';
    }
    return errs;
  }

 
  useEffect(()=>{        
    console.log(err);
    const len =  Object.keys(err).length;
    if(len === 0){
      console.log('모든 인풋요소 인증통과')
    }else{
      console.log('인증 실패');
    }
  },[err]);

  return (
    <main className='join'>
      <div className="inner">
        <h1><a href="#">Join</a></h1>

        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend className='h'>회원가입 입력 폼 양식</legend>

            <table>
              <caption className='h'>회원가입 입력</caption>
              <tbody>
                <tr>
                  <th scope='row'>
                    <label htmlFor="userid">USER ID</label>
                  </th>
                  <td>
                    <input 
                      type="text" 
                      id='userid'
                      name='userid'
                      placeholder='아이디를 입력하세요'
                      value={val.userid}
                      onChange={handleChange}
                    />
                  </td>
                </tr> 
                <tr>
                  <th scope='row'>
                    <label htmlFor="email">E-MAIL</label>
                  </th>
                  <td>
                    <input 
                      type="text" 
                      id='email'
                      name='email'
                      placeholder='이메일 주소를 입력하세요'
                      value={val.email}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th colSpan='2'>
                    <input type="reset" value='CANCEL' />
                    <input type="submit" value='SEND' />
                  </th>
                </tr> 
              </tbody>       
            </table>
          </fieldset>
        </form>
      </div>
    </main>
  )
}

export default Join;