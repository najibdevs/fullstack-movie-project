// routes.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AddMovie from './pages/AddMovie';

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-movie" element={<AddMovie />} /> {/* Correct path */}
    </Routes>
);

export default AppRoutes;