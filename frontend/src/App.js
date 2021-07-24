import { useEffect, useState } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import { Room, Star } from '@material-ui/icons'
import axios from 'axios'
import { format } from 'timeago.js'

import Register from './components/Register/Register'
import Login from './components/Login/Login'
import Place from './components/Place/Place'

import './app.css'

function App() {
	// const currentUser = 'pratik'
	const storage = window.localStorage

	const [currentUser, setCurrentUser] = useState(storage.getItem('user'))
	const [pins, setPins] = useState([])
	const [currentPlaceId, setCurrentPlaceId] = useState(null)
	const [newPlace, setNewPlace] = useState(null)
	const [title, setTitle] = useState(null)
	const [desc, setDesc] = useState(null)
	const [rating, setRating] = useState(0)
	const [showRegister, setShowRegister] = useState(false)
	const [showLogIn, setShowLogIn] = useState(false)

	const [viewport, setViewport] = useState({
		width: '100vw',
		height: '100vh',
		latitude: 47,
		longitude: 17,
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

	// Click on marker to view informatoin pop-up
	const handleMarkerClick = (id, lat, long) => {
		setCurrentPlaceId(id)
		setViewport({ ...viewport, latitude: lat, longitude: long, zoom: 5 })
	}

	// Close place info popup
	const handlePopupClose = () => {
		setCurrentPlaceId(null)
		setViewport({ ...viewport, zoom: 4 })
	}

	// Double click on map to add that place
	const handleAddClick = (e) => {
		const [long, lat] = e.lngLat
		setNewPlace({
			lat,
			long,
		})
	}

	// Add new pin to the database
	const handleSubmit = async (e) => {
		e.preventDefault()

		const newPin = {
			username: currentUser,
			title,
			desc,
			rating,
			lat: newPlace.lat,
			long: newPlace.long,
		}
		console.log(newPin)

		try {
			const res = await axios.post('/pins', newPin)
			setPins([...pins, res.data])
			setNewPlace(null)

			console.log('Added Pin successfully!')
		} catch (error) {
			console.log('Some error occured!')
			console.log(error)
		}
	}

	// When user logout
	const handleLogout = () => {
		storage.removeItem('user')
		setCurrentUser(null)
	}

	return (
		<div className='App'>
			<ReactMapGL
				{...viewport}
				mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
				onViewportChange={(nextViewport) => setViewport(nextViewport)}
				mapStyle='mapbox://styles/aspirine-mapbox/ckrgownyt4wzx18qib1ac0e4g'
				onDblClick={handleAddClick}
				transitionDuration='400'>
				{pins.map((p) => (
					<>
						<Marker
							latitude={p.lat}
							longitude={p.long}
							offsetLeft={-viewport.zoom * 3.5}
							offsetTop={-viewport.zoom * 7}>
							<Room
								style={{
									fontSize: viewport.zoom * 7,
									color: p.username === currentUser ? 'tomato' : 'slateblue',
									cursor: 'pointer',
								}}
								onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
							/>
						</Marker>

						{p._id === currentPlaceId && (
							<Popup
								latitude={p.lat}
								longitude={p.long}
								closeButton={true}
								closeOnClick={false}
								onClose={handlePopupClose}
								anchor='left'>
								<div className='card'>
									<label>Place</label>
									<h4 className='place'>{p.title}</h4>

									<label>Review</label>
									<p className='desc'>{p.desc}</p>

									<label>Rating</label>
									<div className='stars'>
										{Array(p.rating).fill(<Star className='star' />)}
										&nbsp; ({p.rating})
									</div>

									<label>Information</label>
									<span className='username'>
										Created by <b>{p.username}</b>{' '}
									</span>
									<span className='date'>{format(p.createdAt)}</span>
								</div>
							</Popup>
						)}
					</>
				))}
				{newPlace && (
					<Popup
						latitude={newPlace.lat}
						longitude={newPlace.long}
						closeButton={true}
						closeOnClick={false}
						onClose={() => setNewPlace(null)}
						anchor='left'>
						<div>
							<form onSubmit={handleSubmit}>
								<label>Title</label>
								<input
									type='text'
									placeholder='Enter a title'
									onChange={(e) => setTitle(e.target.value)}
								/>

								<label>Review</label>
								<textarea
									rows='5'
									placeholder='Say us something about this place.'
									onChange={(e) => setDesc(e.target.value)}></textarea>

								<label>Rating</label>

								<select onChange={(e) => setRating(e.target.value)}>
									<option value='1'>1</option>
									<option value='2'>2</option>
									<option value='3'>3</option>
									<option value='4'>4</option>
									<option value='5'>5</option>
								</select>

								<button type='submit' className='submitButton'>
									Pin This Place
								</button>
							</form>
						</div>
					</Popup>
				)}

				{currentUser ? (
					<button className='button logout' onClick={handleLogout}>
						Log Out
					</button>
				) : (
					<div className='buttons'>
						<button className='button login' onClick={() => setShowLogIn(true)}>
							Login
						</button>

						<button
							className='button register'
							onClick={() => setShowRegister(true)}>
							Register
						</button>
					</div>
				)}

				{showRegister && <Register setShowRegister={setShowRegister} />}
				{showLogIn && (
					<Login
						setShowLogIn={setShowLogIn}
						storage={storage}
						setCurrentUser={setCurrentUser}
					/>
				)}
			</ReactMapGL>
		</div>
	)
}

export default App
