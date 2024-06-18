import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddMovie from './pages/AddMovie';
import EditMovie from './pages/EditMovie';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add-movie" element={<AddMovie />} />
      <Route path="/edit/:id" element={<EditMovie />} />
    </Routes>
  );
};

export default AppRoutes;
