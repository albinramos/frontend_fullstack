import React, { useState } from "react";
import "./houseCreation.css";
import { useNavigate } from "react-router-dom";

const HouseCreation = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageSrc: [], // Cambiado a un array para manejar múltiples imágenes
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
    // Manejar cambios en las imágenes y actualizar el estado
    const images = Array.from(event.target.files);
    setFormData({ ...formData, imageSrc: images });
  };

  const creationHandler = async (e) => {
    e.preventDefault();
    

    try {
      // Crear un objeto FormData para enviar datos de formulario y archivos
      const formDataWithImages = new FormData();

      // Agregar datos de formulario al objeto FormData
      for (const key in formData) {
        formDataWithImages.append(key, formData[key]);
      }

      // Agregar cada archivo al objeto FormData
      formData.imageSrc.forEach((image, index) => {
        formDataWithImages.append(`imageSrc_${index}`, image);
      });

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
    <label htmlFor="locationValue">Location</label>
    <input
      type="text"
      id="locationValue"
      name="locationValue"
      value={formData.locationValue}
      onChange={handleChanges}/>
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
    <label htmlFor="imageSrc">Image</label>
      <input
        type="file"
        id="imageSrc"
        name="imageSrc"
        accept="image/*"
        multiple
        onChange={handleImageChange}
      />
      <button type="submit">Create House</button>
    </form>
  );
};

export default HouseCreation;
