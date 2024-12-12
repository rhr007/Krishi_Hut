import React from 'react'
import Navbar from './components/Navbar';

import { Routes, Route } from 'react-router-dom';

import Home from './components/Home'
import SignUp from './components/SignUp'
import Footer from './components/Footer';
import Activate from './components/Activate';

const App = () => {
  return (
    <div className='app-container'>

      <Routes>
        <Route path='' element={<Home />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='activate' element={<Activate />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
