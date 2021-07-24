import { useState } from 'react'
import { Popup } from 'react-map-gl'
import axios from 'axios'

import './NewPlace.css'

const NewPlace = ({
	currentUser,
	newPlace,
	setNewPlace,
	viewport,
	setViewport,
	pins,
	setPins,
}) => {
	const [title, setTitle] = useState(null)
	const [desc, setDesc] = useState(null)
	const [rating, setRating] = useState(0)

	const closePopUp = () => {
		setNewPlace(null)
		setViewport({ ...viewport, zoom: 4 })
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
		// console.log(newPin)

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

	return (
		<div>
			{newPlace && currentUser && (
				<Popup
					latitude={newPlace.lat}
					longitude={newPlace.long}
					closeButton={true}
					closeOnClick={false}
					onClose={closePopUp}
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
		</div>
	)
}

export default NewPlace
