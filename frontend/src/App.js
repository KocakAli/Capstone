import Header from './components/Header'
import Trends from './components/Trends'
import Storys from './components/Storys'
import Storypage from './components/Storypage'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const[r, setR] = useState(null)
  const[user, setUser] = useState('')
  useEffect(()=>{
    if(localStorage.getItem('user')){
      setUser(localStorage.getItem('user'))
    }
    console.log('app render')
  })
  return (
    <>
      <Router>
        <Header user={user} setUser={setUser}/>
        <Routes>
          <Route path='/' exact element={<><Trends r={r} setR={setR}/>,<hr></hr>,<Storys r={r} setR={setR}/></>} />
          <Route path='/story/:id'  element={<Storypage  r={r} setR={setR}/>}></Route>
          
          
        </Routes>
      </Router>    
    </>
  );
}

export default App;
