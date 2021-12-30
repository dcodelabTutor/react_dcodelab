import './css/style.css';
import Header from './components/common/Header.js';
import Footer from './components/common/Footer.js';

import Visual from './components/main/Visual.js';
import Info from './components/main/Info.js';

function App() {
  return (
    <div className="App">    
      <Header />
      <Visual />
      <Info />
      <Footer />  
    </div>
  );
}

export default App;
