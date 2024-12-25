import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import HomePageNavbar from './HomePageNavbar';
import URL from '../URL';
import axios from 'axios';

import styles from '../components/PersonalAds.module.css'

const PersonalAds = () => {
    const [token, setToken] = useState(sessionStorage.getItem("token") || '')
    const navigate = useNavigate()
    const serverURL = `${URL()}`
    const [approved, setApproved] = useState([]);


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
        axios.get(`${serverURL}/ads/user/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).
            then(res => {
                setApproved(res.data);
            }).
            catch(error => {
                alert("Someting Went Wrong.")
            })
    }, []);

    function handleUploadAd() {
        navigate('/create-ad')
    }


    return (
        <>
            <HomePageNavbar />
            <button className={styles.uploadAd} onClick={handleUploadAd}>Upload An Ad</button>
            <div>
                {approved.length > 0 ?
                    <div className={styles.adsContainer}>
                        {approved.map(ad => (
                            <div key={ad.id} className={styles.ads}>
                                <img src={ad.url} alt='Product Image' className={styles.ImageBody} />
                                <p>Title: {ad.title}</p>
                                <p>Price: {ad.price}</p>
                                <p>Location: {ad.location}</p>
                                <p>Approved At: {new Date(ad.approved_time).toLocaleString()}</p>

                            </div>
                        ))}

                    </div> : <p className={styles.noAds}>No Ads Found</p>
                }
            </div>
        </>
    );
}

export default PersonalAds;