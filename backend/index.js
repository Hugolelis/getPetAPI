import express from 'express'
const app = express()

import cors from 'cors'

const port = 5000

app.use(express.json())
app.use(cors({credentials: true, origin: 'http://localhost:5000'}))

app.use(express.static('public'))

import { main } from './db/conn.js'

// routes
import { router as UserRoutes } from './routes/UserRoutes.js'

app.use('/users', UserRoutes)

app.listen(port, () => {
    console.log(`Server listen is port ${port}!`)
})