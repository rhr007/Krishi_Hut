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
    const [approved, setApproved] = useState([]);
    const [filteredAds, setFilteredAds] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCriteria, setFilterCriteria] = useState('');

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
            setApproved(res.data);
            setFilteredAds(res.data);
        }).
            catch(error => {
                alert("Someting Went Wrong.")
            })
    }, []);


    function gotoProductDetail(id) {
        navigate(`/project-detail-user/${id}`)
    };



    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = approved.filter((ad) =>
            ad.title.toLowerCase().includes(query)
        );
        setFilteredAds(filtered);
    };


    const handleFilterChange = (e) => {
        const criteria = e.target.value;
        setFilterCriteria(criteria);

        let sortedAds = [...filteredAds];
        if (criteria === 'price') {
            sortedAds.sort((a, b) => a.price - b.price);
        } else if (criteria === 'title') {
            sortedAds.sort((a, b) => a.title.localeCompare(b.title));
        } else if (criteria === 'location') {
            sortedAds.sort((a, b) => a.location.localeCompare(b.location));
        } else if (criteria === 'time') {
            sortedAds.sort((a, b) => new Date(b.approved_time) - new Date(a.approved_time));
        }
        setFilteredAds(sortedAds);
    };

    return (
        <div className={styles.mainContainer}>

            <HomePageNavbar />

            <div className={styles.filterContainer}>
                <form onSubmit={(e) => e.preventDefault()} className={styles.searchForm}>
                    <input
                        type="text"
                        placeholder="Search Keyword"
                        value={searchQuery}
                        onChange={handleSearch}
                        className={styles.searchInput}
                    />
                </form>
                <select
                    value={filterCriteria}
                    onChange={handleFilterChange}
                    className={styles.filterSelect}
                >
                    <option value="">Sort By</option>
                    <option value="price">Price</option>
                    <option value="title">Title</option>
                    <option value="location">Location</option>
                    <option value="time">Newest First</option>
                </select>
            </div>

            {filteredAds.length > 0 ?
                <div className={styles.adsContainer}>
                    {filteredAds.map(ad => (
                        <div key={ad.id} className={styles.ads} onClick={() => (gotoProductDetail(ad.id))} >
                            <img src={ad.url} alt='Product Image' className={styles.ImageBody} />
                            <p>Title: {ad.title}</p>
                            <p>Price: {ad.price} Taka</p>
                            <p>Location: {ad.location}</p>
                            <p>Posted At: {new Date(ad.approved_time).toLocaleString()}</p>

                        </div>
                    ))}

                </div> : <p className={styles.noAds}>No Ads Found</p>
            }



        </div>
    );
}

export default Dashboard;