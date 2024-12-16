import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

import URL from '../URL'
import axios from 'axios'
import styles from '../components/Dashboard.module.css'
import HomePageNavbar from './HomePageNavbar'




const Dashboard = () => {
    const [token, setToken] = useState(sessionStorage.getItem("token") || '')
    const navigate = useNavigate()
    const serverURL = `${URL()}`
    const [approved, setApproved] = useState([])

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

                    }
                })
                .catch(error => {
                    navigate('/signin')
                })
        }
    }, []);

    useEffect(() => {
        axios.get(`${serverURL}/ads/approved`).then(res => {
            setApproved(res.data)
        }).
            catch(error => {
                alert("Someting Went Wrong.")
            })
    }, []);


    function gotoProductDetail(id) {
        navigate(`/project-detail-user/${id}`)
    }


    return (
        <div className={styles.mainContainer}>

            <HomePageNavbar />

            {approved.length > 0 ?
                <div className={styles.adsContainer}>
                    {approved.map(ad => (
                        <div key={ad.id} className={styles.ads} onClick={() => (gotoProductDetail(ad.id))} >
                            <img src='https://placehold.co/200x150' />
                            <p>Title: {ad.title}</p>
                            <p>Price: {ad.price}</p>
                            <p>Location: {ad.location}</p>

                        </div>
                    ))}

                </div> : <p>LOADING</p>
            }



        </div>
    );
}

export default Dashboard;