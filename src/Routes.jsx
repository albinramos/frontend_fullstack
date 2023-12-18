
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/register/Register';
import SearchResults from './components/search/SearchResults';
import Landing from './components/landing/Landing';
import HouseDetails from './components/houseDetails/HouseDetails';
import HouseCreation from './components/houseCreation/HouseCreation';
import UserProfilePage from './components/userProfile/UserProfilePage';


const RoutesComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cities/:city" element={<SearchResults />} />
        <Route path="/housedetails/:id" element={<HouseDetails />} />
        <Route path="/housecreation" element={<HouseCreation />} />
        <Route path="/user" element={<UserProfilePage />} />
        
      </Routes>
    </Router>
  );
};

export default RoutesComponent;
