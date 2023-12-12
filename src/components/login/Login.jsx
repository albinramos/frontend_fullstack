import React, { useState } from 'react';
import 'react-international-phone/style.css';
import './login.css';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const pageStyles = {
    minHeight: '100vh'
  };

const [isRegister, setIsRegister] = useState(false);
const [isLoggedIn, setIsLoggedIn] = useState(false);

const loginHandler = async (e) => {
  e.preventDefault();
  const email = e.target.elements.email.value;
  const password = e.target.elements.password.value;
  const body = {
    email,
    password,
  };

  console.log(body);
  const result = await fetch('http://localhost:3666/login', 
  {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
  })

  const data= await result.json();
  console.log(data);
  console.log(data.result);
  console.log(data.result.id);
  if(data.error){
    alert(data.error);
    return;
  }
  setIsLoggedIn(true);
}

const submitHandler = async (e) => {
  if(isRegister){
    registerHandler(e);
  }
  else{
    loginHandler(e);
  }
}

if(isLoggedIn){
  return <Navigate to='/landing'/>
}
  return (
    <div style={pageStyles}>
    <section className="login">
      <h1>Login</h1>
      <form className='login__form' onSubmit={submitHandler}>
        <input type="email" placeholder="Email" className='form__email'name='email'/>
        <input type="password" placeholder="Password" className='form__password'name='password'/>
        <button type="submit">Login</button>
      </form>    
      
    </section>
  </div>
  );


  }


export default Login