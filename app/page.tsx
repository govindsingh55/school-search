"use client"
import styles from './page.module.css'
import { useState } from 'react';

export default function Home() {
  const [places, setPlaces] = useState([]);
  console.log('plces : ', places)
  const [geolocation, setgeoLocation] = useState({
    lat: undefined,
    long: undefined
  });
  const updateLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
    setgeoLocation(location => ({ ...location, [event.target.name]: event.target.value }))
  }
  const findPlaces = () => {
    // console.log(geolocation, location)
    const url = new URL('/api/places', location.origin);
    url.searchParams.set('lat', geolocation.lat)
    url.searchParams.set('long', geolocation.long)
    // console.log(geolocation, url)
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.data.status === 'OK') {
          // console.log('setup',data.data.status)
          setPlaces(data.data.results)
        }
      })
      .catch(err => console.log('data err : ', err))
  }
  return (
    <main className={styles.main}>
      <h1>find schools and institutions</h1>
      <div id="map"></div>
      <div style={{
        display: 'flex'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center'
        }}>
          <label style={{
            fontSize: '2rem',
            display: 'flex',
            alignItems: 'center'
          }}>
            lat:
            <input type="text" value={geolocation.lat || ''} name="lat" onChange={updateLocation} style={{
              padding: '1em',
              border: '2px solid #c2bdbd'
            }} />
          </label>
          <label style={{
            fontSize: '2rem',
            display: 'flex',
            alignItems: 'center'
          }}>
            long:
            <input type="text" value={geolocation.long || ''} name="long" onChange={updateLocation} style={{
              padding: '1em',
              border: '2px solid #c2bdbd'
            }} />
          </label>
        </div>
        <button onClick={findPlaces} style={{
          border: 'unset',
          boxSizing: 'border-box',
          padding: '0.8em 2em',
          marginLeft: '1em',
          fontSize: '1.2rem'
        }}>find</button>
      </div>
      <div className='place-list'>
        {
          places?.map(place => <div key={place.place_id}>{place.name}</div>)
        }
      </div>
    </main>
  )
}
