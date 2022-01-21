import { combineReducers } from "redux";

//초기상태로 들어갈 값
const initMember = {
  members: [
    {name:'David', position:'CEO'},
    {name:'Emma', position:'Designer'},
    {name:'Michael', position:'Developer'}
  ]
}

const memberReducer=(state=initMember, action)=>{
  switch (action.type){  
    case 'SET_MEMBERS' :
      return {...state, members: action.payload}

    default:
      return state;
  }
}

const reducers = combineReducers({
  memberReducer
})

export default reducers;