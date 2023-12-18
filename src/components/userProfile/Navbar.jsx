const Navbar = ({ setActiveSection, activeSection }) => {
    const handleNavigation = (section) => {
      setActiveSection(section);
    };
  
    const handleLogout = async () => {
      try {
        // Realizar la llamada a la API para cerrar sesión
        const response = await fetch('http://localhost:3666/login/end', {
          method: 'POST',
          credentials: 'include',
        });
  
        if (response.ok) {
          // Si el cierre de sesión es exitoso, redirigir a la página de inicio
          window.location.href = 'http://localhost:5173/';
        } else {
          console.error('Error al cerrar sesión');
        }
      } catch (error) {
        console.error('Error al cerrar sesión:', error.message);
      }
    };
  
    const buttonStyle = {
      padding: '8px',
      margin: '4px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      backgroundColor: 'transparent',
      cursor: 'pointer',
    };
  
    const activeButtonStyle = {
      ...buttonStyle,
      backgroundColor: '#aaf',
    };
  
    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: '200px' }}>
        <button
          style={activeSection === 'userinfo' ? activeButtonStyle : buttonStyle}
          onClick={() => handleNavigation('userinfo')}
        >
          User Info
        </button>
        <button
          style={activeSection === 'reservations' ? activeButtonStyle : buttonStyle}
          onClick={() => handleNavigation('reservations')}
        >
          Reservations
        </button>
        <button
          style={activeSection === 'houses' ? activeButtonStyle : buttonStyle}
          onClick={() => handleNavigation('houses')}
        >
          Your Houses
        </button>
        <button onClick={handleLogout} style={buttonStyle}>
          Logout
        </button>
      </div>
    );
  };
  
  export default Navbar;
  