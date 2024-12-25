import React from 'react'
import Navbar from './Navbar';
import logoImg from '../images/logo.png'
import styles from '../components/Home.module.css'

const Home = () => {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1>কৃষকের হাসি, ন্যায্য মূল্যের নিশ্চয়তা!</h1>
        <img src={logoImg} alt="" />
      </div>
    </>
  );
}

export default Home;