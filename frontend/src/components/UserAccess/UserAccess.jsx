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

	const clickedRegister = () => {
		setShowRegister(true)
		setShowLogIn(false)
	}

	const clickedLogin = () => {
		setShowRegister(false)
		setShowLogIn(true)
	}

	return (
		<div>
			{currentUser ? (
				<div className='userInfo'>
					<button className='button logout' onClick={handleLogout}>
						Log Out
					</button>
					<span className='user'>{currentUser}</span>
				</div>
			) : (
				<div className='buttons'>
					<button className='button login' onClick={clickedLogin}>
						Log In
					</button>

					<button className='button register' onClick={clickedRegister}>
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
