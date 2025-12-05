// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SearchResults from './pages/SearchResults';
import PropertyDetail from './pages/PropertyDetail';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/search-results" element={<SearchResults />} />
                <Route path="/property/:id" element={<PropertyDetail />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
