import { useState } from 'react'

import Login from '../Login/Login'
import Register from '../Register/Register'

import './UserAccess.css'

const UserAccess = ({ currentUser, setCurrentUser }) => {
	const storage = window.localStorage

	const [showLogIn, setShowLogIn] = useState(false)
	const [showRegister, setShowRegister] = useState(false)

	// When user logout
	const handleLogout = () => {
		storage.removeItem('user')
		setCurrentUser(null)
	}

	return (
		<div>
			{currentUser ? (
				<button className='button logout' onClick={handleLogout}>
					Log Out
				</button>
			) : (
				<div className='buttons'>
					<button className='button login' onClick={() => setShowLogIn(true)}>
						Log In
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
		</div>
	)
}

export default UserAccess
