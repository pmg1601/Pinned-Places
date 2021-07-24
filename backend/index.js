import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'

import pinRoutes from './routes/pinRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
	res.send('Welcome to backend ... !')
})

app.get('/api', (req, res) => {
	res.send('Kuch nahi milega ... !')
})

mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() =>
		console.log(`MongoDB Connected! ${process.env.MONGO_URI}`.black.bgGreen)
	)
	.catch((error) => console.log(error))

// Routes
app.use('/api/pins', pinRoutes)
app.use('/api/users', userRoutes)

// Start Listening
app.listen(PORT, () =>
	console.log(`\nBackend Server Running at http://localhost:${PORT}`.yellow)
)
