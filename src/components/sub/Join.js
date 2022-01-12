import { useEffect, useState } from "react";

function Join(){
  const initVal={
    userid : '',
    pwd1 : '',
    pwd2 : '',
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
    let eng = /[a-zA-Z]/;
    let num = /[0-9]/;
    let spc = /[!@#$%^&*]/;

    if( !val.userid || val.userid.length <5 ){
      errs.userid='아이디 5글자 이상입력';
    } 
    if( !val.pwd1 || val.pwd1.length<5 || !eng.test(val.pwd1) || !num.test(val.pwd1) || !spc.test(val.pwd1)){
      errs.pwd1='비밀번호는 5글자 이상, 문자,숫자,특수문자를 모두 포함';
    }
    if( !val.email || val.email.length <8 || !/@/.test(val.email) ){
      errs.email='이메일주소를 8글자 이상입력';
    }
    if( val.pwd1 !== val.pwd2 ){
      errs.pwd2='두개의 비밀번호를 동일하게 입력';
    }
    return errs;
  }

  //미션1- pwd2 input요소 추가후  pwd1이랑, pwd2의 값이 같아야지 인증 통과
  //미션2- textarea도 인증항목에 포함
  //미션3- 인풋아래쪽에 span태그로 에러문구 출력


 
  useEffect(()=>{        
    console.log(err);
    const len =  Object.keys(err).length;
    if(len === 0){
      console.log('인증 성공');
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
                {/* userid */}
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
                    <span className='err'>{err.userid}</span>
                  </td>
                </tr> 

                {/* password */}
                <tr>
                  <th scope='row'>
                    <label htmlFor="pwd1">PASSWORD</label>
                  </th>
                  <td>
                    <input 
                      type="password" 
                      id='pwd1'
                      name='pwd1'
                      placeholder='비밀번호를 입력하세요'
                      value={val.pwd1}
                      onChange={handleChange}
                    />
                    <span className='err'>{err.pwd1}</span>
                  </td>
                </tr>

                {/* re password */}
                <tr>
                  <th scope='row'>
                    <label htmlFor="pwd2">RE-PASSWORD</label>
                  </th>
                  <td>
                    <input 
                      type="password" 
                      id='pwd2'
                      name='pwd2'
                      placeholder='비밀번호를 재입력하세요'
                      value={val.pwd2}
                      onChange={handleChange}
                    />
                    <span className='err'>{err.pwd2}</span>
                  </td>
                </tr>

                {/* email */}
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
                    <span className='err'>{err.email}</span>
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