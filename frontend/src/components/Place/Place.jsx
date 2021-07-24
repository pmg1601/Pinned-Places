import { Room, Star } from '@material-ui/icons'
import { useState } from 'react'
import { Marker, Popup } from 'react-map-gl'
import { format } from 'timeago.js'
import './Place.css'

const Place = () => {
	const [pins, setPins] = useState([])
	const [currentUser, setCurrentUser] = useState(null)
	const [currentPlaceId, setCurrentPlaceId] = useState(null)

	const [viewport, setViewport] = useState({
		width: '100vw',
		height: '100vh',
		latitude: 47,
		longitude: 17,
		zoom: 4,
	})

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

	return (
		<div>
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
		</div>
	)
}

export default Place
