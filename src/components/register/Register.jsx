import React, { useState } from 'react';
import 'react-international-phone/style.css';
import { PhoneInput } from 'react-international-phone';
import './register.css';


const Register = () => {

  const [phone, setPhone] = useState('');

  const pageStyles = {
    minHeight: '100vh'
  };

  return (
    <div style={pageStyles}>
    <section className="register">
    <h1>Register</h1>
    <form className='register__form'>
    <input type='text' placeholder='First Name'className='form__name'/>
    <input type='text' placeholder='Last Name'className='form__last'/>
    <input type="email" placeholder="Email" className='form__email'/>
  <div className='form__phone'>
    <PhoneInput
      defaultCountry="es"
      value={phone}
      onChange={(phone) => setPhone(phone)}
    />
  </div>
    <input type="password" placeholder="Password" className='form__password'/>
    <input type='file' className='form__file'/>
    <button type="submit">Login</button>
  </form>  
  </section>
  </div>

  )


}













export default Register