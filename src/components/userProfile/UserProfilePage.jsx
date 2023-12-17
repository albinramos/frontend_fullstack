import React, { useEffect, useState } from 'react';
import UserInfo from './UserInfo';
import Reservations from './Reservations';
import Houses from './Houses';
import Navbar from './Navbar';

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
    <div style={{ display: 'flex' }}>
      <Navbar setActiveSection={setActiveSection} activeSection={activeSection} />
      <div style={{ marginLeft: '20px' }}>
        {userData && (
          <>
            {activeSection === 'userinfo' && <UserInfo userData={userData} />}
            {activeSection === 'reservations' && <Reservations userId={userData.user._id} />}
            {activeSection === 'houses' && userData.user.userType.some(type => type.toLowerCase().includes('owner')) && <Houses userId={userData.user._id} />}
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
