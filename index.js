const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
dotenv.config()

async function dbConnect() {
  try {
    await mongoose.connect(process.env.mongouri)
    console.log("connected")
  } catch (err) {
    console.log(err)
  }
}
dbConnect()


const userSchema = new mongoose.Schema({
  Name: String,
  Email: String,
  Password: String
})

const User = mongoose.model("User", userSchema)

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }))

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

app.post('/signupSubmit', async (req, res) => {
  const { name, email, password } = req.body
  const hashedpass = await bcrypt.hash(password,10)

  try {
    await User.create({
      Name: name,
      Email: email,
      Password: hashedpass
    })
    res.redirect('/login')
  } catch (err) {
    console.log(err)
    res.send("Error while signing up")
  }
})

app.post('/loginSubmit', async (req, res) => {
  const { email, password } = req.body

  try {
    const cred = await User.findOne({ Email: email})
    const passmatch = await bcrypt.compare(password,cred.Password)

    if (cred && passmatch) {
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
