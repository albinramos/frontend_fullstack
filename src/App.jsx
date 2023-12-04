import React from 'react'
import Home from './components/home/Home'
import Login from './components/login/Login'
import Register from './components/register/Register'
import './App.css'

function App() {
 
  return (
    <>
      <main className='main'>
        <Home />
        <Login />
        <Register />    
      </main>
    </>
  )
}

export default App
