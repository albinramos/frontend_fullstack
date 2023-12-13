
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/register/Register';
import SearchResults from './components/search/SearchResults';
import Landing from './components/landing/Landing';
import HouseDetails from './components/houseDetails/HouseDetails';

const RoutesComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cities/:city" element={<SearchResults />} />
        <Route path="/housedetails/:id" element={<HouseDetails />} />
      </Routes>
    </Router>
  );
};

export default RoutesComponent;
