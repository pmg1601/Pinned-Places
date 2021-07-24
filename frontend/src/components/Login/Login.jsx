import { Close, Room } from '@material-ui/icons'
import axios from 'axios'
import { useRef, useState } from 'react'
import './Login.css'

const Register = ({ setShowLogIn, storage, setCurrentUser }) => {
	const [error, setError] = useState(false)
	const [success, setSuccess] = useState(false)

	const nameRef = useRef()
	const passwordRef = useRef()

	const handleSubmit = async (e) => {
		e.preventDefault()

		const user = {
			username: nameRef.current.value,
			password: passwordRef.current.value,
		}

		try {
			const res = await axios.post('/users/login', user)
			storage.setItem('user', res.data.username)

			setError(false)
			setSuccess(true)
			setShowLogIn(false)
			setCurrentUser(res.data.username)
		} catch (error) {
			console.log(error)
			setError(true)
		}
	}

	return (
		<div className='loginContainer'>
			<div className='loginLogo'>
				<Room /> Pinned Places
			</div>

			<form onSubmit={handleSubmit}>
				<input type='text' placeholder='User Name' ref={nameRef} />
				<input type='password' placeholder='Password' ref={passwordRef} />

				<button className='loginBtn'>Log In</button>

				{error && <span className='failure'>Something Went Wrong!</span>}
				{success && <span className='success'>Logged In!</span>}
			</form>
			<Close className='cancelBtn' onClick={() => setShowLogIn(false)} />
		</div>
	)
}

export default Register
