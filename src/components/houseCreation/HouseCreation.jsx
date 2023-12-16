import React, { useState } from "react";
import "./houseCreation.css";
import { useNavigate } from "react-router-dom";

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
  

  const handleChanges = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
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
if (formData.imageSrc){
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
    <form onSubmit={creationHandler} encType="multipart/form-data">
      <label htmlFor="title">Title</label>
      <input
        type="text"
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChanges}
      />
    <label htmlFor="description">Description</label>
    <textarea
      id="description"
      name="description"
      value={formData.description}
      onChange={handleChanges}/>
    <label htmlFor="category">Category</label>
    <input
      type="text"
      id="category"
      name="category"
      value={formData.category}
      onChange={handleChanges}/>
    <label htmlFor="roomCount">Room Count</label>
    <input
      type="number"
      id="roomCount"
      name="roomCount"
      value={formData.roomCount}
      onChange={handleChanges}/>
    <label htmlFor="bathroomCount">Bathroom Count</label>
    <input
      type="number"
      id="bathroomCount"
      name="bathroomCount"
      value={formData.bathroomCount}
      onChange={handleChanges}/>
    <label htmlFor="guestCount">Guest Count</label>
    <input
      type="number"
      id="guestCount"
      name="guestCount"
      value={formData.guestCount}
      onChange={handleChanges}/>
   <label htmlFor="locationValue">
        Write your property location to obtain the coordinates
      </label>
      <div>
        {/* Mostrar el campo de entrada solo si locationVisible es verdadero */}
        
          
            <input
              type="text"
              id="locationValue"
              name="locationValue"
              value={formData.locationValue}
              onChange={handleChanges}
            />
            <button type="button" onClick={handleLocationSearch}>
              Search Location
            </button>
          
        
        <button type="button" onClick={handleLocationChange}>
          Change Location
        </button>
      </div>
    <label htmlFor="amenities">Amenities</label>
    <input
      type="text"
      id="amenities"
      name="amenities"
      value={formData.amenities}
      onChange={handleChanges}/>
    <label htmlFor="price">Price</label>
    <input
      type="number"
      id="price"
      name="price"
      value={formData.price}
      onChange={handleChanges}/>
    <label htmlFor="foto">Select a photo of your property, maximum 5 photos</label>
      <input
         type="file"
         id="foto"
         name="foto"
         accept="image/*"
         multiple
        
        onChange={handleImageChange}
      />
      <button type="submit">Create House</button>
    </form>
  );
};

export default HouseCreation;
