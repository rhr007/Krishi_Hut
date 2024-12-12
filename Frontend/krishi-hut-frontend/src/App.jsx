import React from 'react'
import Navbar from './components/Navbar';

import { Routes, Route } from 'react-router-dom';

import Home from './components/Home'
import SignUp from './components/SignUp'
import Footer from './components/Footer';
import Activate from './components/Activate';
import SignIn from './components/SignIn';

const App = () => {
  return (
    <div className='app-container'>

      <Routes>
        <Route path='' element={<Home />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='activate' element={<Activate />} />
        <Route path='signin' element={<SignIn />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
