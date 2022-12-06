import './App.css';
import Header from './components/Header'
import Footer from './components/Footer';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import Admin from './components/Admin';
import AppCal from './AppCal';
import Reserve from './components/Reserve';
import Table from './components/Table/Table';

function App() {
  return (
    
    <BrowserRouter>
      <Header/>
      <div className= 'bg-container'>
      <Routes>
        <Route path="/"  element={<Home/>}/>

        <Route path="admin" element={<Admin/>} />
        
        <Route path="reserve" element={<Reserve />} /> 

      </Routes>     
      </div>
      {/* <Footer/>   */}
    </BrowserRouter>

  );
}

export default App;
