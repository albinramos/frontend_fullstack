
import React, { useEffect, useState } from 'react';
import UserInfo from './UserInfo';
import Reservations from './Reservations';
import Houses from './Houses';
import Navbar from './Navbar';
import "./userProfile.css";

const UserProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [activeSection, setActiveSection] = useState('userinfo'); // Usar minúsculas

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await fetch('http://localhost:3666/landing/credentials', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          if (response.status === 401) {
            window.location.href = 'http://localhost:5173/login';
            return;
          } else {
            console.error(`Error al obtener datos del usuario: ${response.status}`);
            return;
          }
        }

        const data = await response.json();

        if (data && data.id) {
          const userResponse = await fetch(`http://localhost:3666/user/${data.id}`, {
            method: 'GET',
            credentials: 'include',
          });
          const userData = await userResponse.json();
          setUserData(userData);
        } else {
          console.error('No se obtuvo un id desde la primera API');
        }
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error.message);
      }
    };

    fetchUserId();
  }, []); 

  return (
    <div className="user-profile-container">
      <Navbar setActiveSection={setActiveSection} activeSection={activeSection} />
      <div className="user-profile-content">
        {userData && (
          <>
            {activeSection === 'userinfo' && <UserInfo userData={userData.user} />}
            {activeSection === 'reservations' && <Reservations userId={userData.user._id} />}
            {activeSection === 'houses' && userData.user.userType.some(type => type.toLowerCase().includes('owner')) && <Houses userId={userData.user._id} />}
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;

