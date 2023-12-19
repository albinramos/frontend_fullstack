import React, { useState, useEffect } from "react";
import "./houseCreation.css";
import { Link, useNavigate } from "react-router-dom";
import { FaBackspace } from "react-icons/fa";

const HouseCreation = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    roomCount: "",
    bathroomCount: "",
    guestCount: "",
    locationValue: "",
    amenities: [],
    price: "",
    userId: "",
  });

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
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error.message);
      }
    };

    fetchUserId();
  }, []); 


  const handleChanges = (event) => {
    const { name, value } = event.target;

   
    if (event.target.multiple) {
      const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
      setFormData({ ...formData, [name]: selectedOptions });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = (event) => {
    const images = Array.from(event.target.files);
    setFormData({ ...formData, imageSrc: images });
  };

  const handleLocationSearch = async () => {
    const address = formData.locationValue;

    if (!address) {
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          address
        )}`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const firstResult = data[0];
        const lat = parseFloat(firstResult.lat);
        const lon = parseFloat(firstResult.lon);

        setFormData({
          ...formData,
          locationValue: `${lat},${lon},${firstResult.display_name}`

        });


      }
    } catch (error) {
      console.error("Error al buscar coordenadas:", error.message);
    }
  };

  const handleLocationChange = () => {
    setFormData({
      ...formData,
      locationValue: "",
    });

  };

  const creationHandler = async (e) => {
    e.preventDefault();

    try {
      const formDataWithImages = new FormData();

      for (const key in formData) {
        formDataWithImages.append(key, formData[key]);
      }
      if (formData.imageSrc) {
        formData.imageSrc.forEach((image, index) => {
          formDataWithImages.append("foto", image);
        });
      }
      const result = await fetch("http://localhost:3666/house", {
        method: "POST",
        credentials: "include",
        body: formDataWithImages,
      });

      const data = await result.json();
      console.log(data);

      if (data.error) {
        alert(data.error);
        return;
      }

      alert("House creation successful");
    } catch (error) {
      console.error("Error creating house:", error.message);
    }
  };

  const navigate = useNavigate();

  return (
    
    <form onSubmit={creationHandler} encType="multipart/form-data" className="form__house-creation">
      <div className='go-back-div'>
          <Link to="/">
            <FaBackspace className="back-icon" />
            {FaBackspace}
          </Link>
      </div>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        id="title"
        name="title"
        required
        value={formData.title}
        onChange={handleChanges}
        className="from__house-creation-input"
      />
      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        value={formData.description}
        onChange={handleChanges} 
        className="from__house-creation-input"
      />
      <label htmlFor="category">Category</label>
    <select
      id="category"
      name="category"
      value={formData.category}
      onChange={handleChanges}
      className="from__house-creation-input"
    >
      <option value="">Select category</option>
      <option value="chalet">Chalet</option>
      <option value="apartment">Apartment</option>
      <option value="flat">Flat</option>
    </select>
      <label htmlFor="roomCount">Room Count</label>
      <input
        type="number"
        id="roomCount"
        name="roomCount"
        max="9"
        min="1"
        value={formData.roomCount}
        onChange={handleChanges}
        className="from__house-creation-input"
       />
      <label htmlFor="bathroomCount">Bathroom Count</label>
      <input
        type="number"
        id="bathroomCount"
        name="bathroomCount"
        max="9"
        min="1"
        value={formData.bathroomCount}
        onChange={handleChanges} 
        className="from__house-creation-input"
      />
      <label htmlFor="guestCount">Guest Count</label>
      <input
        type="number"
        id="guestCount"
        name="guestCount"
        max="30"
        min="1"
        value={formData.guestCount}
        onChange={handleChanges} 
        className="from__house-creation-input"
      />
      <label htmlFor="locationValue">
        Write your property location to obtain the coordinates
      </label>
      <div>

        <input
          type="text"
          id="locationValue"
          name="locationValue"
          value={formData.locationValue}
          onChange={handleChanges}
          className="from__house-creation-input"
        />
        <button type="button" onClick={handleLocationSearch} className="from__house-creation-input">
          Search Location
        </button>


        <button type="button" onClick={handleLocationChange} className="from__house-creation-input">
          Change Location
        </button>
      </div>
      
      <label htmlFor="amenities">Amenities</label>
      <select
        id="amenities"
        name="amenities"
        value={formData.amenities}
        onChange={handleChanges}
        multiple
        className="from__house-creation-select"
      >
        <option value="wifi">WiFi</option>
        <option value="tv">TV</option>
        <option value="swimming pool">Swimming Pool</option>
        <option value="bbq">BBQ</option>
        <option value="garden">Garden</option>
        <option value="kitchen">Kitchen</option>
        <option value="parking">Parking</option>
        <option value="air conditioner">Air Conditioner</option>
        <option value="washer">Washer</option>
        <option value="hairdryer">Hairdryer</option>
        <option value="iron">Iron</option>
        <option value="terrace">Terrace</option>
      </select>
      <label htmlFor="price">Price</label>
      <input
        type="number"
        id="price"
        name="price"
        min="1"
        value={formData.price}
        onChange={handleChanges}
        className="from__house-creation-input"
      />
      <label htmlFor="foto">Select a photo of your property, maximum 5 photos</label>
      <input
        type="file"
        id="foto"
        name="foto"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        className="from__house-creation-input"
      />
      <button type="submit" className="button-74">Create House</button>
    </form>
    
  );
};

export default HouseCreation;
