const express = require('express')
const app = express()

const router = express.Router()
const cors = require('cors')
const axios = require('axios')
const { json } = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 3000

//enabling cors
app.use(cors())

//Parse data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//add router in express
app.use('/', router)

//WAKEUP route
router.get('/wakeup', (req, res) => {
  res.send({ message: 'Heroku: I am awake' })
})

//GET route
router.get('/', (req, res) => {
  res.send('Personal Portfolio Website Server Home')
})

//POST route
router.post('/post', async (req, res) => {
  //Destructuring response token from request body
  const { token } = req.body

  //sends secret key and response token to google
  const googleURL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${token}`
  const googleResponse = await axios.post(googleURL)

  console.log('Google Response: ', googleResponse.data)

  //check response status and send back to the client-side

  res.send(googleResponse.data.success)
})

app.listen(port, () => {
  console.log(`server is running on ${port}`)
})

// https://cors-anywhere.herokuapp.com/
