import Router from 'express'
import bcrypt from 'bcrypt'

import User from '../models/UserModel.js'

const router = Router()

// Register an user
router.post('/register', async (req, res) => {
	const { password, username, email } = req.body

	try {
		// generate new password
		const salt = await bcrypt.genSalt(10)
		const hashedPassword = await bcrypt.hash(password, salt)

		// create new user
		const newUser = new User({
			username,
			email,
			password: hashedPassword,
		})

		// save user and send response
		const savedUser = await newUser.save()
		res.status(200).json(savedUser._id)
	} catch (error) {
		res.status(500).json(error)
	}
})

// Login user
router.post('/login', async (req, res) => {
	const { username, password } = req.body

	try {
		// Find user
		const user = await User.findOne({ username })
		!user && res.status(400).json({ message: 'Invalid Credentials!' })

		// Validate user
		const validPassword = await bcrypt.compare(password, user.password)
		!validPassword && res.status(400).json({ message: 'Invalid Credentials!' })

		// Send success
		res
			.status(200)
			.json({ _id: user.id, username: user.username, message: 'Success' })
	} catch (error) {
		res.status(500).json(error)
	}
})

export default router
