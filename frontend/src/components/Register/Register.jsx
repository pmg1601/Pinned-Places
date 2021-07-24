import { Close, Room } from '@material-ui/icons'
import axios from 'axios'
import { useRef, useState } from 'react'
import './Register.css'

const Register = ({ setShowRegister }) => {
	let errPrint

	// const storage = window.localStorage

	const [success, setSuccess] = useState(false)
	const [error, setError] = useState(false)

	const nameRef = useRef()
	const emailRef = useRef()
	const passwordRef = useRef()

	const handleSubmit = async (e) => {
		e.preventDefault()

		const newUser = {
			username: nameRef.current.value,
			email: emailRef.current.value,
			password: passwordRef.current.value,
		}

		try {
			await axios.post('/users/register', newUser)

			setError(false)
			setSuccess(true)
			setTimeout(() => {
				setShowRegister(false)
				setSuccess(false)
			}, 3000)
		} catch (error) {
			errPrint = error.message
			console.log(error)
			setError(true)

			setTimeout(() => {
				setShowRegister(false)
				setSuccess(false)
				setError(false)
			}, 3000)
		}
	}

	return (
		<div className='registerContainer'>
			<div className='logo'>
				<Room /> Pinned Places
			</div>

			<form onSubmit={handleSubmit}>
				<input type='text' placeholder='User Name' ref={nameRef} />
				<input type='email' placeholder='Email' ref={emailRef} />
				<input type='password' placeholder='Password' ref={passwordRef} />

				<button className='registerBtn'>Register</button>
				{success && (
					<span className='success'>
						Registration Successfull. You Can LogIn now!
					</span>
				)}

				{error && <span className='failure'>{errPrint}</span>}
			</form>
			<Close className='cancelBtn' onClick={() => setShowRegister(false)} />
		</div>
	)
}

export default Register
