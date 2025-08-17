const express = require('express')
const app = express()
const mongoose = require('mongoose')

async function dbConnect() {
  try {
    await mongoose.connect('mongodb+srv://venkatadeepak8:deepu123@cluster0.1kzbnfm.mongodb.net/')
    console.log("connected")
  } catch (err) {
    console.log(err)
  }
}
dbConnect()

// Schema
const Users = new mongoose.Schema({
  Name: String,
  Email: String,
  Password: String
})

const User = mongoose.model("User", Users)

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }))

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/home.html')
})

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html')
})

app.get('/signup', (req, res) => {
  res.sendFile(__dirname + '/public/signup.html')
})

app.get('/reciepe', (req, res) => {
  res.sendFile(__dirname + '/public/reciepe.html')
})

// Signup
app.post('/signupSubmit', async (req, res) => {
  const { name, email, password } = req.body

  try {
    await User.create({
      Name: name,
      Email: email,
      Password: password
    })
    res.redirect('/login')
  } catch (err) {
    console.log(err)
    res.send("Error while signing up")
  }
})

// Login
app.post('/loginSubmit', async (req, res) => {
  const { email, password } = req.body

  try {
    const cred = await User.findOne({ Email: email, Password: password })

    if (cred) {
      res.redirect('/reciepe')
    } else {
      res.send("Invalid email or password")
    }
  } catch (err) {
    console.log(err)
    res.send("Error while logging in")
  }
})

app.listen(3095, () => {
  console.log("Server running on http://localhost:3095")
})
