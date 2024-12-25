import React, { useEffect, useState } from 'react'

import styles from '../components/ProductDetails.module.css'
import AdminNavbar from './AdminNavbar';
import { useNavigate, useParams } from 'react-router-dom';

import URL from '../URL';
import axios from 'axios';

const ProductDetails = () => {
    const { id } = useParams();
    const serverURL = `${URL()}/ads`;
    const [prodectDetail, setProductDetail] = useState()
    const token = sessionStorage.getItem('token')
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`${serverURL}/${id}`).then(res => {
            setProductDetail(res.data)
        }).
            catch(e => {
                alert("Something Went Wrong")
                navigate('/admin')
            })
    }, []);

    function handleAdAccept() {
        axios(
            {
                method: 'put',
                url: `${serverURL}/accept/${id}`,
                'headers': {
                    'Content-Type': 'applicaton/json',
                    'Authorization': `Bearer ${token}`
                }
            }).then(() => {
                alert("Ad Accepted")
                navigate('/admin')
            }).
            catch(e => {
                navigate('/admin')
            })
    };

    function handleAdReject() {
        axios.delete(`${serverURL}/${id}`, {
            'headers': {
                'Authorization': `Bearer ${token}`
            }
        }).
            then(() => {
                alert("Ad Rejected");
                navigate('/admin')
            }).
            catch(() => {
                alert("Server Error")
                navigate('/admin')
            })
    }

    return (
        <>
            <AdminNavbar />
            <div className={styles.mainContainer}>
                {
                    prodectDetail ? <div className={styles.detailInfo}>

                        <img src={prodectDetail.url} alt='Product Image' className={styles.ImageBody} />
                        <p>Title: <b>{prodectDetail.title}</b></p>
                        <p>Price: <b>{prodectDetail.price}</b> Taka</p>
                        <p>Catagory: {prodectDetail.catagory}</p>
                        <p>Description: {prodectDetail.description}</p>
                        <p>Location: {prodectDetail.location}</p>
                        <p>Owner: {prodectDetail.user.first_name}</p>
                        <p>Owner Mobile Number: <b>{prodectDetail.user.contact}</b></p>
                        <p>Owner Email: <b>{prodectDetail.user.email}</b></p>

                        <div className={styles.buttons}>
                            <button className={styles.actBut} onClick={handleAdAccept}>Accept</button>
                            <button className={styles.rejBut} onClick={handleAdReject}>Reject</button>
                        </div>
                    </div>

                        : <p>Loading</p>
                }


            </div>
        </>
    );
}

export default ProductDetails;