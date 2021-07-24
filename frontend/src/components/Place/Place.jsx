import { useEffect, useState } from 'react'
import ReactMapGL from 'react-map-gl'
import axios from 'axios'

import Pin from '../Pin/Pin'
import NewPlace from '../NewPlace/NewPlace'
import UserAccess from '../UserAccess/UserAccess'

import './Place.css'

const Place = () => {
	const storage = window.localStorage

	const [currentUser, setCurrentUser] = useState(storage.getItem('user'))
	const [pins, setPins] = useState([])
	const [newPlace, setNewPlace] = useState(null)

	const [viewport, setViewport] = useState({
		width: '100vw',
		height: '100vh',
		latitude: 40.866667,
		longitude: 34.566667,
		zoom: 4,
	})

	useEffect(() => {
		const getPins = async () => {
			try {
				const res = await axios.get('/pins')
				setPins(res.data)
			} catch (error) {
				console.log(error)
			}
		}
		getPins()
	}, [])

	// Double click on map to add that place
	const handleAddClick = (e) => {
		const [long, lat] = e.lngLat
		setNewPlace({
			lat,
			long,
		})
	}

	return (
		<ReactMapGL
			{...viewport}
			mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
			onViewportChange={(nextViewport) => setViewport(nextViewport)}
			mapStyle='mapbox://styles/aspirine-mapbox/ckrgownyt4wzx18qib1ac0e4g'
			onDblClick={handleAddClick}
			transitionDuration='500'>
			{/* Instructions */}
			<div className='instruction'>
				<ul>
					<li>
						- Click on <b>marker</b> to view place.
					</li>
					<li>
						- <b>Double click</b> on map to add your place.
					</li>
					<li>
						-{' '}
						<span style={{ color: 'tomato', fontWeight: 'bold' }}>Orange</span>{' '}
						markers represent your places.
					</li>
					<li>
						-{' '}
						<span style={{ color: 'slateblue', fontWeight: 'bold' }}>Blue</span>{' '}
						markers represent others places.
					</li>
				</ul>
			</div>

			{/* Show all pins */}
			<Pin
				currentUser={currentUser}
				pins={pins}
				viewport={viewport}
				setViewport={setViewport}
			/>

			{/* Add new pin by double click */}
			<NewPlace
				currentUser={currentUser}
				newPlace={newPlace}
				setNewPlace={setNewPlace}
				viewport={viewport}
				setViewport={setViewport}
				pins={pins}
				setPins={setPins}
			/>

			{/* User Access */}
			<UserAccess currentUser={currentUser} setCurrentUser={setCurrentUser} />
		</ReactMapGL>
	)
}

export default Place
