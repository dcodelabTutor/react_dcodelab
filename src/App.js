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
  /*
  const main = useRef(null);   
  let pos = useRef([]);  
  const [index, setIndex] = useState(0);  

  const getIndex = index=>{
    setIndex(index);
  }

  const handleResize = ()=>{   
    const secs = main.current.querySelectorAll('.myScroll');
    let arr = [];
    for(let sec of secs) arr.push(sec.offsetTop);
    pos.current = arr;   
  }
 
  const handleScroll = ()=>{   
    let scroll = window.scrollY;   
    const btns = main.current.querySelectorAll('#btns li');   
   
    pos.current.map((pos,index)=>{
      if(scroll>=pos){
        for(const btn of btns) btn.classList.remove('on');
        btns[index].classList.add('on');    
      }
    })   
   
  }

  useEffect(()=>{     
    handleResize();    
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    new Anime(window,{
      prop: 'scroll',
      value: pos.current[index],
      duration: 500
    })

    return ()=>{  
      window.removeEventListener('resize', handleResize);  
      window.removeEventListener('scroll', handleScroll);
    }
  },[index]);
  */

  return (
    <div className="App">   
      <Switch>
        <Route exact path="/">
          <Header type={'main'} />
          <div>
            <Visual />  
            <News />
            <Intro />  
            <Info />
            {/* <Btns getIndex={getIndex} /> */}
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
