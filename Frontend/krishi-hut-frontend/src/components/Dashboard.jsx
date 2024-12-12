import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

import URL from '../URL'
import axios from 'axios'
import styles from '../components/Dashboard.module.css'
import HomePageNavbar from './HomePageNavbar'




const Dashboard = () => {
    const [token, setToken] = useState(sessionStorage.getItem("token") || '')
    const navigate = useNavigate()
    const serverURL = URL()
    const [projects, setProjects] = useState([])

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
                        // console.log(typeof(response.data));

                    }
                })
                .catch(error => {
                    navigate('/signin')
                })
        }
    }, [])



    return (
        <div className={styles.mainContainer}>

            <HomePageNavbar />
            <div className={styles.projectContainer}>
                <div className={styles.headline}>
                    <p>Your Project List</p>
                </div>

            </div>



        </div>
    );
}

export default Dashboard;