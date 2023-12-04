import React from 'react'
import Home from './components/home/Home'
import Login from './components/login/Login'
import Register from './components/register/Register'
import Landing from './components/landing/Landing'
import './App.css'

function App() {
 
  return (
    <>
      <main className='main'>
        <Landing />
        <Home />
        <Login />
        <Register />    
      </main>
    </>
  )
}

export default App
