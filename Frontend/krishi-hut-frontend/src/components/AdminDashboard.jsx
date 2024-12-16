import React, { useEffect, useState } from 'react'
import AdminNavbar from '../components/AdminNavbar.jsx'
import axios from 'axios'
import URL from '../URL.jsx'
import styles from '../components/AdminDashboard.module.css'


const AdminDashboard = () => {
    const [unapproved, setUnapproved] = useState([])
    const serverURL = `${URL()}/ads/unapproved`

    useEffect(() => {
        axios.get(serverURL).then(res => {
            setUnapproved(res.data)
            // console.log(res.data);
            console.log(unapproved);
        }).
            catch(error => {
                alert("Someting Went Wrong.")
            })
    }, [])
    return (
        <div>
            <AdminNavbar />
            {unapproved.length > 0 ?
                <div className={styles.adsContainer}>
                    {unapproved.map(ad => (
                        <div key={ad.id} className={styles.ads}>
                            <img src='https://placehold.co/200x150' />
                            <p>Title: {ad.title}</p>
                            <p>Price: {ad.price}</p>
                            <p>Location: {ad.location}</p>
                            <div className={styles.buttons}>
                                <button className={styles.actBut}>Accept</button>
                                <button className={styles.rejBut}>Reject</button>
                            </div>

                        </div>
                    ))}

                </div> : <p>LOADING</p>
            }
        </div >
    );
}

export default AdminDashboard;