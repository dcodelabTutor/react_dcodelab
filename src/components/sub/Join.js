import { useEffect, useRef, useState } from "react";

function Join(){
  const initVal={
    userid : '',
    pwd1 : '',
    pwd2 : '',
    email: '',
    comments: '',
    gender: ''
  }
  const [val, setVal] = useState(initVal);
  const [err, setErr] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = e => {   
    const {name, value} = e.target;     
    setVal({...val, [name]: value});     
  }

  const handleCheck = e => {
    //해당 함수가 실행된 대상의 name값 변수에 저장
    const {name} = e.target;
    //이벤트 대상이 체크 유무를 boolean값으로 저장
    const isCheck = e.target.checked;
    //val state에 해당 네임을 키, boolean값을 value로 저장
    setVal({...val, [name]: isCheck});  
  }

  //submit이벤트 발생하면 실행되는 함수
  const handleSubmit = e =>{ 
    e.preventDefault();   
    setIsSubmit(true);
    setErr(check(val));  
    console.log(val);
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
    if( !val.pwd2 || val.pwd1 !== val.pwd2 ){
      errs.pwd2='두개의 비밀번호를 동일하게 입력';
    }
    if( !val.comments || val.comments.length <10 ){
      errs.comments='남기는말을 10글자 이상입력';
    }
    if( !val.gender ){
      errs.gender='성별을 선택하세요';
    }
    return errs;
  }
 
  useEffect(()=>{        
    console.log(err);
    const len =  Object.keys(err).length;
    if(len === 0 && isSubmit){
      console.log('인증 성공');
      setSuccess(true);     
    }else{
      console.log('인증 실패');
      setSuccess(false);
    }
  },[err]);

  return (
    <main className='join'>
      <div className="inner">
        <h1><a href="#">Join</a></h1>

        {success ? <div>회원가입을 축하합니다.</div> : null }

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
                      onChange={handleChange}
                    />
                    <span className='err'>{err.email}</span>
                  </td>
                </tr>

                {/* comments */}
                <tr>
                  <th scope='row'>
                    <label htmlFor="comments">COMMENTS</label>
                  </th>
                  <td>
                    <textarea
                      col='30'
                      row='10'
                      id='comments'
                      name='comments'
                      placeholder='남기는 말을 적어주세요2'                  
                      onChange={handleChange}
                    ></textarea>
                    <span className='err'>{err.comments}</span>
                  </td>
                </tr>

                {/* gender */}
                <tr>
                  <th scope='row'>
                    GENDER
                  </th>
                  <td>
                    <label htmlFor='male'>Male</label>
                    <input 
                      type="radio" 
                      id='male' 
                      name='gender' 
                      onChange = {handleCheck}
                    />

                    <label htmlFor='femal'>Female</label>
                    <input 
                      type="radio" 
                      id='female' 
                      name='gender' 
                      onChange = {handleCheck} 
                    />
                    <span className='err'>{err.gender}</span>
                  </td>
                </tr>

                {/* btn set */}
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