import React from 'react'
import Navbar from './components/Navbar';

import { Routes, Route } from 'react-router-dom';

import Home from './components/Home'
import SignUp from './components/SignUp'

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path='home' element={<Home />} />
        <Route path='signup' element={<SignUp />} />
      </Routes>

    </>
  );
}

export default App;
