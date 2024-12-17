import React, { useEffect, useState } from 'react'

import styles from '../components/ProductDetails.module.css'
import { useNavigate, useParams } from 'react-router-dom';

import URL from '../URL';
import axios from 'axios';
import HomePageNavbar from './HomePageNavbar';

const ProductDetailsForUser = () => {
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
                navigate('/dashboard')
            })
    }, []);
    return (
        <>
            <HomePageNavbar />

            <div className={styles.mainContainer}>
                {
                    prodectDetail ? <div className={styles.detailInfo}>

                        <img src="https://placehold.co/250x250" alt="product image" />
                        <p>Title: <b>{prodectDetail.title}</b></p>
                        <p>Price: <b>{prodectDetail.price}</b></p>
                        <p>Catagory: {prodectDetail.catagory}</p>
                        <p>Description: {prodectDetail.description}</p>
                        <p>Location: {prodectDetail.location}</p>
                        <p>Owner: {prodectDetail.user.first_name}</p>
                        <p>Owner Mobile Number: <b>{prodectDetail.user.contact}</b></p>
                        <p>Owner Email: <b>{prodectDetail.user.email}</b></p>
                        <p>Published At: <b>{new Date(prodectDetail.approved_time).toLocaleString()}</b></p>

                    </div>

                        : <p>Loading</p>
                }


            </div>
        </>
    )
}

export default ProductDetailsForUser