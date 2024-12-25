import React, { useState, useEffect } from 'react'
import axios from 'axios'


import styles from '../components/HomePageNavbar.module.css'
import ProfileInfo from './ProfileInfo'
import URL from '../URL'
import { NavLink, useNavigate } from 'react-router-dom'

const HomePageNavbar = () => {
    const [isVisible, setIsVisible] = useState(false)

    const [token, setToken] = useState(sessionStorage.getItem("token") || '')
    const serverURL = URL()
    const navigate = useNavigate()

    const [firstName, setFirstName] = useState('')
    const [lasttName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [contact, setContact] = useState('')
    const [acCreated, setAcCreated] = useState('')
    const [id, setID] = useState(0);

    const [active, setActive] = useState(1); // to manage active p tag

    useEffect(() => {
        if (!token) {
            navigate('/signin')
        }
        else {
            axios.get(`${serverURL}/users/me`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    if (response.status == 200) {
                        // console.log(response);
                        setFirstName(response.data.first_name)
                        setLastName(response.data.last_name)
                        setEmail(response.data.email)
                        setContact(response.data.contact)
                        setAcCreated(response.data.ac_creation)
                        setID(response.data.id)
                        console.log(response.data.contact);

                    }
                })
                .catch(error => {
                    console.log(error);
                    navigate('/signin')
                })
        }
    }, [])


    function handleDashboardActive() {
        setActive(1);
        setIsVisible(false);
        navigate('/dashboard')
    }

    function handleYourAdActive() {
        setActive(2);
        setIsVisible(false);
        navigate('/yourads')
    }

    function handleVisible() {
        setIsVisible(currentVisible => !currentVisible);
        setActive(0);
    }


    function signOut() {
        const isConfirmed = confirm("Are you sure, you want to sign out?")
        if (isConfirmed) {
            sessionStorage.removeItem("token")
            navigate('/signin')
        }
    }

    return (
        <>
            <div className={styles.mainContainer}>
                <ul>
                    <li className={active == 0 ? styles.actv : ''} onClick={handleVisible}>Profile</li>
                    <NavLink to={'/dashboard'}><li>Dashboard</li></NavLink>
                    <NavLink to={'/yourads'}><li>Your Ads</li></NavLink>

                </ul>
                {/* <p className={active == 0 ? styles.actv : ''} onClick={handleVisible}>
                    Profile
                </p>

                <p className={active == 1 ? styles.actv : ''} onClick={handleDashboardActive}>
                    Dashboard
                </p>

                <p className={active == 2 ? styles.actv : ''} onClick={handleYourAdActive}>
                    Your Ads
                </p> */}

                <button onClick={signOut}>Sign Out</button>

            </div>

            {isVisible ? <ProfileInfo id={id} firstName={firstName} lasttName={lasttName} email={email} contact={contact} acCreated={acCreated} /> : ""}
        </>
    );
}

export default HomePageNavbar;