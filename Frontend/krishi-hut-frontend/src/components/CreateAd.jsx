import React, { useEffect, useState } from 'react'
import HomePageNavbar from './HomePageNavbar'
import { useNavigate } from 'react-router-dom';

import styles from '../components/CreateAd.module.css'
import axios from 'axios';
import URL from '../URL';

const CreateAd = () => {
    const [token, setToken] = useState(sessionStorage.getItem("token") || '');
    const navigate = useNavigate();

    const [title, setTitle] = useState('')
    const [catagory, setCatagory] = useState('')
    const [price, setPrice] = useState('')
    const [location, setLocation] = useState('')
    const [description, setDescription] = useState('');
    const [productImage, setProductImage] = useState();

    const serverURL = `${URL()}`

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



    function handleNewAd(e) {
        e.preventDefault();

        if (!productImage) return

        // image data
        const data = new FormData()
        data.append('file', productImage)
        data.append('upload_preset', 'Krishi_Hut_Images')
        data.append('cloud_name', 'dpovux2da')



        axios.post("https://api.cloudinary.com/v1_1/dpovux2da/image/upload", data).then(res => {
            // ad data
            const adData = {
                title: title,
                catagory: catagory,
                price: price,
                location: location,
                description: description,
                url: res.data.url
            }


            axios.post(`${serverURL}/ads/`, adData, {
                'headers': {
                    'Authorization': `Bearer ${token}`
                }
            }).then(() => {
                alert("Ad Created");
                navigate('/dashboard')
            }).catch(() => {
                alert("server error");

            })
        }).catch(e => {
            alert(e)
        })

        // axios.post(`${serverURL}/ads`, adData, {
        //     'headers': {
        //         'Authorization': `Bearer ${token}`
        //     }
        // }).then(() => {
        //     alert("Ad Created");
        //     navigate('/dashboard')
        // }).catch(() => {
        //     alert("server error");

        // })
    }


    function handleFileUpload() {

        if (!file) return

        const data = new FormData()
        data.append('file', file)
        data.append('upload_preset', 'Krishi_Hut_Images')
        data.append('cloud_name', 'dpovux2da')

        axios.post("https://api.cloudinary.com/v1_1/dpovux2da/image/upload", data).then(res => {
            const dataBody = {
                url: res.data.url
            }
            axios.post(`${serverURL}/profile/`, dataBody, {
                'headers': {
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => {
                alert('uploaded')
            }).catch(e => {
                alert('server error')
            })
        }).catch(e => {
            alert(e)
        })
    }

    return (
        <>
            <HomePageNavbar />
            <div className={styles.mainContainer}>
                <h2 className={styles.headline}>Upload an Ad</h2>

                <form className={styles.inputs} onSubmit={handleNewAd}>
                    <input type="text" placeholder='Title' required onChange={(e) => setTitle(e.target.value)} />
                    <input type="text" placeholder='Catagory' required onChange={(e) => setCatagory(e.target.value)} />
                    <input type="number" placeholder='Price' required onChange={(e) => setPrice(e.target.value)} />
                    <input type="text" placeholder='Location' required onChange={(e) => setLocation(e.target.value)} />
                    <textarea type="textarea" placeholder='Description' required onChange={(e) => setDescription(e.target.value)} className={styles.descriptionArea}></textarea>

                    <div className={styles.pictureContainer}>
                        <p className={styles.pictureNotice}>Upload a picture of your Product</p>
                        <input type="file" className={styles.productPictureButton} onChange={(e) => setProductImage(e.target.files[0])} required />
                        <hr />
                    </div>

                    <input type='submit' className={styles.submitButton} value='Upload' />
                </form>
            </div>
        </>
    )
}

export default CreateAd