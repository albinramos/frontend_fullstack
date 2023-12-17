import React, { useState } from 'react';
import './userProfile.css'; // Asegúrate de importar el archivo CSS

const UserInfo = ({ userData }) => {
  const [error, setError] = useState(null);

  const handleDeleteUser = async () => {
    try {
      const response = await fetch('http://localhost:3666/useractive', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userActive: false,
        }),
      });

      if (response.ok) {
      
        console.log('Usuario eliminado exitosamente');
      } else {
        setError('Error al eliminar el usuario');
      }
    } catch (error) {
      console.error('Error al eliminar el usuario:', error.message);
      setError('Error al eliminar el usuario');
    }
  };

  return (
    <div className="user-info-card">
      <h2 className="user-info-title">
        Hi, {userData.lastname ? userData.lastname : 'Guest'} Welcome back
      </h2>
      {userData.lastname && (
        <>
          <p className="user-info-email">Email: {userData.email}</p>
          {!userData.userType.some(type => type.toLowerCase().includes('owner')) ? (
            <>
              <button onClick={handleDeleteUser} className="user-info-button">
                Eliminar Usuario
              </button>
             
            </>
          ) : null}
        </>
      )}
       <button className="user-info-button">Modificar Datos</button>
      {error && <p className="user-info-error">{error}</p>}
    </div>
  );
};

export default UserInfo;
