import './css/style.css';
import Anime from './class/anime.js';
import {Route, Switch} from 'react-router-dom';

//import common component
import Header from './components/common/Header.js';
import Footer from './components/common/Footer.js';

//import main component
import Visual from './components/main/Visual.js';
import News from './components/main/News.js';
import Intro from './components/main/Intro.js';
import Info from './components/main/Info.js';
import Btns from './components/main/Btns.js';


//import sub component
import Department from './components/sub/Department.js';
import Community from './components/sub/Community.js';
import Gallery from './components/sub/Gallery.js';
import Youtube from './components/sub/Youtube.js';
import Location from './components/sub/Location.js';
import Join from './components/sub/Join.js';
import { useEffect, useRef, useState } from 'react';

function App() {
  const main = useRef(null); 
  let pos = useRef([]);
  //버튼 클릭할때마다 변경될 순서값을 담을 state 추가
  const [index, setIndex] = useState(0);

  const getPos = ()=>{
    const secs = main.current.querySelectorAll('.myScroll');
    let arr = [];
    for(let sec of secs) arr.push(sec.offsetTop);
    pos.current = arr;
    console.log(pos.current);
  }

  useEffect(()=>{  
    getPos();
    window.addEventListener('resize', getPos);

    return ()=>{  
      window.removeEventListener('resize', getPos);  
    }
  },[]);


  return (
    <div className="App">   
      <Switch>
        <Route exact path="/">
          <Header type={'main'} />
          <div ref={main}>
            <Visual />  
            <News />
            <Intro />  
            <Info />
            <Btns />
          </div>
        </Route> 
        
        <Route path='/'>
          <Header type={'sub'} />
        </Route>
      </Switch>
      

      <Route  path="/department" component={Department}></Route>
      <Route  path="/community" component={Community}></Route>
      <Route  path="/gallery" component={Gallery}></Route>
      <Route  path="/youtube" component={Youtube}></Route>
      <Route  path="/location" component={Location}></Route>
      <Route  path="/join" component={Join}></Route>      

      <Footer />  
    </div>
  );
}

export default App;
