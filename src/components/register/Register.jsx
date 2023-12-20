import React, { useState } from 'react';
import 'react-international-phone/style.css';
import { PhoneInput } from 'react-international-phone';
import './register.css';
import { Link, useNavigate } from "react-router-dom";
import { FaBackspace } from "react-icons/fa";


const Register = () => {

  const [isRegister, setIsRegister] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!passwordRegex.test(password)) {
      setPasswordError(
        'Password must have at least 8 characters, 1 uppercase letter and 1 number'
      );
      return false;
    }

    setPasswordError('');
    return true;
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    try{
      const firstName = e.target.elements.firstName.value;
      const lastName = e.target.elements.lastName.value;
      const email = e.target.elements.email.value;
      const phoneNumber = phone;
      const image = e.target.elements.image.value;
      const password = e.target.elements.password.value;
      const confirmPassword = e.target.elements.confirmPassword.value;
      const body = {
        firstName,
        lastName,
        email,
        phoneNumber,
        image,
        password,
        confirmPassword,
      };

      if (!validatePassword(password)) {
        return;
      }


      console.log(body);
      const result = await fetch('http://localhost:3666/user', 
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
      if(data.error){
        alert(data.error);
        return;
      }
      alert('Register successful');
    }
    catch(error){
      console.log('Error registering: ', error.message);
    }
  }

  const [phone, setPhone] = useState('');

  const pageStyles = {
    minHeight: '100vh'
  };

  return (
    <div style={pageStyles}>
      <div className='go-back-div-register'>
          <Link to="/login">
            <FaBackspace className="back-icon" />
            {FaBackspace}
          </Link>
      </div>
    <section className="register">
    <img src='../src/assets/logo.jpg' alt='logo' className='logo-login'/>
    <h1>REGISTER</h1>
    <form className='register__form' onSubmit={registerHandler}>
    <input type='text' placeholder='First Name'className='form__name'name='firstName'/>
    <input type='text' placeholder='Last Name'className='form__last'name='lastName'/>
    <input type="email" placeholder="Email" className='form__email'name='email'/>
  <div className='form__phone'>
    <PhoneInput
      defaultCountry="es"
      value={phone}
      onChange={(phone) => setPhone(phone)}
    />
  </div>
    <input type="password" placeholder="Password" className='form__password'name='password'/>
    <div className="password-error">{passwordError}</div>
    <input type="password" placeholder="Confirm Password" className='form__password'name='confirmPassword'/>
    <p className='register__photo'>Select your profile photo:</p>
    <input type='file' className='form__file photo-form'name='image' />
    <button type="submit" className='button-74'>Register</button>
  </form>  
  </section>
  </div>
  )
}

export default Register