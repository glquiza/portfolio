import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Scalable router setup: ready for future detail routes e.g. /projects/:id */}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
