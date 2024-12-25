import React, { useEffect, useState } from 'react'

import styles from '../components/ProfileInfo.module.css'
import axios from 'axios';
import URL from '../URL';

const ProfileInfo = (props) => {
  const [imageURL, setImageURL] = useState('')
  const [token, setToken] = useState(sessionStorage.getItem('token') || '');
  const serverURL = URL();

  function handleFileUpload() {
    const file = event.target.files[0];
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

  useEffect(() => {
    axios.get(`${serverURL}/dp`, {
      'headers': {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => {
      setImageURL(res.data.msg)
    })
  }, [])

  return (
    <div className={styles.mainContainer}>
      <div className={styles.profileMenu}>
        <div className={styles.pictureContainer}>
          <img src={imageURL} alt="profile picture" className={styles.profilePicture} />
          <input type="file" className={styles.profileImageButton} onChange={handleFileUpload} />
          <hr />
        </div>

        <p>First Name: <b>{props.firstName}</b></p>
        <p>Last Name: <b>{props.lasttName}</b></p>
        <p>Email: <b>{props.email}</b></p>
        <p>Contact: <b>{props.contact}</b></p>
        <p>Account Creation Date-Time: <b>{props.acCreated}</b></p>
      </div>
    </div>
  );
}

export default ProfileInfo;