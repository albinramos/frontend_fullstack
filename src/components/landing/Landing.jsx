import React, { useState, useEffect } from 'react';
import './landing.css';
import { useNavigate } from 'react-router-dom'; 
import CityAutosuggest from './../cityAutosuggest';
import { fetchCityData } from '../../apiUtils';


const Landing = (isLoggedIn, handleLogout) => {
  const pageStyles = {
    minHeight: '100vh'
  };

  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const goToProfile = () => {
    navigate('/profile');
    setMenuOpen(false); // Cerrar el menú después de hacer clic en una opción
  };


  const [randomHouses, setRandomHouses] = useState([]);
  const [city, setCity] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [selectedHouse, setSelectedHouse] = useState(null);

  const handleCitySelection = (suggestion) => {
    setCity(suggestion);
  };

  const handleMoreInfoClick = (house) => {
    setSelectedHouse(house);
    // Utiliza navigate para redirigir a HouseDetails y pasar la información en state
    navigate(`/housedetails/${house.id}`, { state: { selectedHouse: house } });
  };

  const handleLogoutClick = () => {
    // Llamar a la función de logout
    handleLogout();
  };

  const handleLandingClick = () => {
    // Use the navigate function to go to the login page
    navigate('/');
  };

  const getHouses = async () => {
    try {
      const endpoint = 'http://localhost:3666/house';
      const response = await fetch(endpoint, { credentials: 'include' });
      const data = await response.json();
      console.log('data:', data);
  
      // Obtener el cityName para cada casa y actualizar el estado
      const allHouses = data.houses;
  
      // Obtener 6 casas aleatorias
      const randomIndices = getRandomIndices(allHouses.length, 6);
      const randomHouses = randomIndices.map(index => allHouses[index]);
  
      const housesWithCityName = await Promise.all(randomHouses.map(async (house) => {
        const cityName = house.locationValue.split(', ')[2];
        return { ...house, cityName };
      }));
  
      setRandomHouses(housesWithCityName);
    } catch (error) {
      console.error('Error fetching houses:', error.message);
    }
  };
  
  // Función para obtener índices aleatorios únicos
  const getRandomIndices = (max, count) => {
    const indices = [];
    while (indices.length < count) {
      const randomIndex = Math.floor(Math.random() * max);
      if (!indices.includes(randomIndex)) {
        indices.push(randomIndex);
      }
    }
    return indices;
  };

  useEffect(() => {
    getHouses();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      const searchpoint = `http://localhost:3666/search?startDate=${arrivalDate}&endDate=${departDate}&guestCount=${guests}&location=${city.lat},${city.lon}`;
      
  try {
  const response = await fetch(searchpoint, { credentials: 'include' });
  const data = await response.json();
  console.log("response", response);
  console.log("dataaaaaa", data);

  const cityName = city.name;
  const citySlug = cityName.toLowerCase().replace(/\s/g, '-');

  navigate(`/cities/${citySlug}`, { state: { data } });
} catch (error) {
  console.log("Error fetching search data:", error);
}
      const response = await fetch(searchpoint, {credentials: 'include'});
      console.log("response",response);
      const data = await response.json();
      console.log("dataaaaaa",data);
      navigate(`/cities/${cityName}`, { data });
    }
    catch{
      console.log("error");
    }
    const cityName = city.name;
    const citySlug = city.name.toLowerCase().replace(/\s/g, '-');
    console.log(departDate)
    console.log(arrivalDate)
    console.log(guests)
    console.log("2:",city.lat);
    console.log("3:",city.lon);
    console.log("1:",cityName);
    console.log("4:",citySlug);
    // Navigate to the search page with the form data and cityData
  };

  


  return (
    <div style={pageStyles}>
      <section className="landing">
      {/* Botón para abrir/cerrar el menú */}
      <div className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? '✕' : '☰'}
        </div>
        {/* Mostrar "LOGIN" o "LOGOUT" según el estado de autenticación */}
        {/* Renderizar el menú según el estado de autenticación y isMenuOpen */}
        {isLoggedIn && isMenuOpen && (
          <div className="user-menu">
            <p onClick={goToProfile}>Perfil</p>
            <p onClick={() => navigate('/housecreation/:id')}>Add House</p>
            <p onClick={handleLogout}>Logout</p>
          </div>
        )}
        <h1>Landing</h1>
        <div className='landing__input'>
          <form className='landing__form' onSubmit={handleSubmit}>
            <label for='city' className="city-autosuggest-title">City</label>
            <CityAutosuggest onSelectCity={handleCitySelection} />
            <label for='arrivalDate'>Arrival Date</label>
            <input type='date' placeholder='Arrival Date' className='form__arrival-date' value={arrivalDate} onChange={(e) => setArrivalDate(e.target.value)} />
            <label for='departureDate'>Departure Date</label>
            <input type="date" placeholder="Depart Date" className='form__depart-date' value={departDate} onChange={(e) => setDepartDate(e.target.value)} />
            <label for='totalGuests'>Nº of Guests</label>
            <input type="number" className='form__guests' value={guests} onChange={(e) => setGuests(e.target.value)} />
            <button type="submit" className='landing-submit'>Submit</button>
          </form>
        </div>
        <div className='landing__container'>
          {randomHouses.map((house, index) => {
            let imageElement;

            if (house.imageSrc && house.imageSrc.length > 0) {
              imageElement = (
                <img src={house.imageSrc[0]} alt={`House ${index + 1}`} className='landing__img' />
              );
            } else {
              imageElement = (
                <img src='../src/assets/no-image.jpg' alt={`No Image`} className='landing__img' />
              );
            }

            return (
              <div key={index} className='landing__house-card'>
                {imageElement}
                <div className='landing__house-card__price'>
                <p className='landing__p-card-price'>{house.price} €</p>
                </div>
                <h2 className='landing__h2-title'>{house.title}</h2>
                <div className='landing__house-card-block-main'>
                <div className='landing__house-card-block1'>
                  <p className='landing__p-card'><strong>City:</strong> {house.cityName}</p>
                  <p className='landing__p-card'><strong>Rooms Nº: </strong> {house.roomCount}</p>
                </div>
                <div className='landing__house-card-block1'>
                  <p className='landing__p-card'><strong>Bathrooms Nº: </strong>{house.bathroomCount}</p>
                  <p className='landing__p-card'><strong>Total Guests Number: </strong>{house.guestCount}</p>
                </div>
                  </div>
                    <button className="button-74" onClick={() => handleMoreInfoClick(house)}>
                      More Info
                    </button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Landing;
