import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import LogOut from './pages/LogOut';
import './styles/App.css';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/sign-in' element={<SignIn />} />
        <Route exact path='/log-out' element={<LogOut />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
