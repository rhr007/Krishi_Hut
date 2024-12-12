import React, { useState, useEffect } from 'react'
import axios from 'axios'


import styles from '../components/HomePageNavbar.module.css'
import ProfileInfo from './ProfileInfo'
import URL from '../URL'
import { useNavigate } from 'react-router-dom'

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
                        console.log(response.data.contact);

                    }
                })
                .catch(error => {
                    console.log(error);
                    navigate('/signin')
                })
        }
    }, [])


    function handleVisible() {
        setIsVisible(currentVisible => !currentVisible)
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
                <p onClick={handleVisible}>Profile</p>
                <button onClick={signOut}>Sign Out</button>
            </div>

            {isVisible ? <ProfileInfo firstName={firstName} lasttName={lasttName} email={email} contact={contact} acCreated={acCreated} /> : ""}
        </>
    );
}

export default HomePageNavbar;