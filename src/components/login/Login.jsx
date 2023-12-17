import React, { useState } from 'react';
import 'react-international-phone/style.css';
import './login.css';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const pageStyles = {
    minHeight: '100vh'
  };

  const [isRegister, setIsRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

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

    // Verificar que onLogin sea una función antes de llamarla
    if (typeof onLogin === 'function') {
      onLogin(data.result.id);
    }

    setIsLoggedIn(true);
  }

  const submitHandler = async (e) => {
    if(isRegister){
      // Lógica para el registro
    }
    else{
      loginHandler(e);
    }
  }

  if(isLoggedIn){
    // Redirigir al usuario a la página principal después de iniciar sesión
    return <Navigate to='/'/>
  }

  const navigateToRegister = () => {
    // Utiliza la función navigate para redirigir a la página de registro
    navigate('/register');
  };

  return (
    <div style={pageStyles}>
      <section className="login">
        <img src='../src/assets/logo.jpg' alt='logo' className='logo-login'/>
        <div className='login__input'>
        <form className='login__form' onSubmit={submitHandler}>
          <input type="email" placeholder="Email" className='form__email' name='email' />
          <input type="password" placeholder="Password" className='form__password' name='password' />
          <button type="submit" className="button-74">Login</button>
          <p className="login__register-link" onClick={navigateToRegister}>
            {isRegister ? 'Login' : <strong> Register </strong>}
             If you're not registered yet
          </p>
        </form>
        </div>
      </section>
    </div>
  );
}

export default Login;
