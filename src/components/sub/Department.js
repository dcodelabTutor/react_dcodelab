import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMembers } from '../../redux/actions';

function Department(){
  const frame = useRef(null);
  const members = useSelector(state=>state.memberReducer.members);
  console.log(members);
  const dispatch = useDispatch();

  const newMember = [
    {name:'Tom', position:'CEO'},
    {name:'Emma', position:'Designer'},
    {name:'Michael', position:'Developer'}
  ]

  useEffect(()=>{
    frame.current.classList.add('on');
  },[])

  return (
    <main ref={frame}>
      <div className="inner">
        <h1><a href="#">Department</a></h1>
        <button onClick={()=>{
          dispatch(setMembers(newMember))        
        }}>맴버 변경</button>
      </div>
    </main>
  )
}

export default Department;