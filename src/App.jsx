import React from 'react'
import Home from './components/home/Home'
import Login from './components/login/Login'
import Register from './components/register/Register'
import Landing from './components/landing/Landing'
import Search from './components/search/Search'
import './App.css'

function App() {
 
  return (
    <>
      <main className='main'>
        <Landing />
        <Home />
        <Login />
        <Register />
        <Search />  
      </main>
    </>
  )
}

export default App
