import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './context/AuthContext';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import LogOut from './pages/LogOut';
import PostCreate from './components/Post/PostCreate';
import Post from './components/Post/Post';
import PostEdit from './components/Post/PostEdit';
import './styles/App.css';

const App = () => {
  const { loggedIn, user, token } = useAuthContext()

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/sign-in' element={loggedIn ? <Navigate to='/' /> : <SignIn />} />
        <Route exact path='/sign-up' element={loggedIn ? <Navigate to='/' /> : <SignUp />} />
        <Route exact path='/log-out' element={<LogOut />} />
        <Route exact path='/create-post' element={loggedIn ? <PostCreate /> : <Navigate to='/' />} />
        <Route exact path='/posts/:id' element={loggedIn ? <Post /> : <Navigate to='/' />} />
        <Route exact path='/posts/:id/edit' element={loggedIn ? <PostEdit /> : <Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
