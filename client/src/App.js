import './App.css';
import Landing from './components/LandingPage/LandingPage.jsx';
import Home from './components/HomePage/HomePage.jsx';
import Form from './components/FormPage/FormPage.jsx';
import Detail from './components/DetailPage/DetailPage.jsx';
import {Routes, Route} from 'react-router-dom';

function App (){
  return(
    <div className='App'>
      <Routes>

        <Route path='/' element={<Landing/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/form' element={<Form/>}/>
        <Route path='/detail/:id' element={<Detail/>}/>

      </Routes>
    </div>
  );
}


export default App;