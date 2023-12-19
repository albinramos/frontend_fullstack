
import React from 'react';
import "./userProfile.css"
import { Link, useNavigate } from "react-router-dom";
import { FaBackspace } from "react-icons/fa";


const Navbar = ({ setActiveSection, activeSection }) => {


    const handleNavigation = (section) => {
      setActiveSection(section);
    };
  
    const handleLogout = async () => {
      try {
        const response = await fetch('http://localhost:3666/login/end', {
          method: 'POST',
          credentials: 'include',
        });
  
        if (response.ok) {
          window.location.href = 'http://localhost:5173/login';
        } else {
          console.error('Error al cerrar sesión');
        }
      } catch (error) {
        console.error('Error al cerrar sesión:', error.message);
      }
    };
  
    return (
        <div className='sidebar--container'>
          <div className='go-back-div'>
            <Link to="/">
              <FaBackspace className="back-icon" />
              {FaBackspace}
            </Link>
          </div>
      <ul className="sidebar">
        <li
          className={`sidebar-item ${activeSection === 'userinfo' ? 'sidebar-item-active' : ''}`}
          onClick={() => handleNavigation('userinfo')}
        >
          User Info
        </li>
        <li
          className={`sidebar-item ${activeSection === 'reservations' ? 'sidebar-item-active' : ''}`}
          onClick={() => handleNavigation('reservations')}
        >
          Reservations
        </li>
        <li
          className={`sidebar-item ${activeSection === 'houses' ? 'sidebar-item-active' : ''}`}
          onClick={() => handleNavigation('houses')}
        >
          Your Houses
        </li>
        <li className="sidebar-item" onClick={handleLogout}>
          Logout
        </li>
      </ul>
      </div>
    );
  };
  
  export default Navbar;