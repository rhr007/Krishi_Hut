import React from 'react'
import Navbar from './components/Navbar';

import { Routes, Route } from 'react-router-dom';

import Home from './components/Home'

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path='home' element={<Home />} />
      </Routes>

    </>
  );
}

export default App;
