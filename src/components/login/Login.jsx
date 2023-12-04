import React, { useState } from 'react';
import 'react-international-phone/style.css';
import { PhoneInput } from 'react-international-phone';
import './login.css';

const Login = () => {

  const [phone, setPhone] = useState('');

  return (
    <section className="login">
      <h1>Login</h1>
      <form className='login__form'>
        <input type="email" placeholder="Email" className='form__email'/>
        <input type="password" placeholder="Password" className='form__password'/>
        <button type="submit">Login</button>
      </form>    
      
    </section>
  );

}




export default Login