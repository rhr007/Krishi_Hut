import React, { useEffect, useState } from 'react'
import AdminNavbar from '../components/AdminNavbar.jsx'
import axios from 'axios'
import URL from '../URL.jsx'
import styles from '../components/AdminDashboard.module.css'
import ProductDetails from './ProductDetails.jsx'
import { useNavigate } from 'react-router-dom'


const AdminDashboard = () => {
    const [unapproved, setUnapproved] = useState([])
    const serverURL = `${URL()}/ads/unapproved`
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(serverURL).then(res => {
            setUnapproved(res.data)
        }).
            catch(error => {
                alert("Someting Went Wrong.")
            })
    }, []);


    function gotoProductDetail(id) {
        navigate(`/project-detail/${id}`)
    }




    return (
        <div>
            <AdminNavbar />
            {unapproved.length > 0 ?
                <div className={styles.adsContainer}>
                    {unapproved.map(ad => (
                        <div key={ad.id} className={styles.ads} onClick={() => (gotoProductDetail(ad.id))} >
                            <img src='https://placehold.co/200x150' />
                            <p>Title: {ad.title}</p>
                            <p>Price: {ad.price}</p>
                            <p>Location: {ad.location}</p>

                        </div>
                    ))}

                </div> : <p>LOADING</p>
            }
        </div >
    );
}

export default AdminDashboard;