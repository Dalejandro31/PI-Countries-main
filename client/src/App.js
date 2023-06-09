import './App.css';
import Landing from './components/LandingPage/LandingPage.jsx';
import Home from './components/HomePage/HomePage.jsx';
import Form from './components/FormPage/FormPage.jsx';
import Detail from './components/DetailPage/DetailPage.jsx';
import Redirect from './components/Redirect/Redirect.jsx';
import {Routes, Route, Navigate} from 'react-router-dom';

function App (){
  return(
    <div className='App'>
      <Routes>

        <Route path='/' element={<Landing/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/form' element={<Form/>}/>
        <Route path='/detail/:id' element={<Detail/>}/>
        <Route path='*' element={<Navigate to='/error'/>}/>
        <Route path="/error" element={< Redirect/>} />
      </Routes>
    </div>
  );
}


export default App;