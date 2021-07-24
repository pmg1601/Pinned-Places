import Router from 'express'
import Pin from '../models/PinModel.js'

// Create a pin
const router = Router()

router.post('/', async (req, res) => {
	const newPin = new Pin(req.body)

	try {
		const savedPin = await newPin.save()
		res.status(200).json(savedPin)
	} catch (error) {
		res.status(500).json(error)
	}
})

// Get all pins
router.get('/', async (req, res) => {
	try {
		const pins = await Pin.find()
		res.status(200).json(pins)
	} catch (error) {
		res.status(500).json(error)
	}
})

export default router
