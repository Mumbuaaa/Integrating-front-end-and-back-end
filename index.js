//Set up server

//import packages
const session = require('express-session')
const express = require('express')
const MySQLStore = require('connect-mysql2')(session)
const path = require('path')
const db = require('./config/db')

// const cors = require('cors')
require('dotenv').config()

// app.use(cors());

const patientRoutes = require('./routes/patients')
const doctorRoutes = require('./routes/doctors')
// const appointmentRoutes = require('./routes/appointments')
// const adminRoutes = require('./routes/admin')

//Accessing db which is in config folder

const authRoutes = require('./routes/auth')
//Add routes for patients, doctors, appointments, admin


//Initialize server with express()
const app = express()

//Set up middleware
//Inform server to use json data format during data handling
app.use(express.json())

//Set up session-used to store data
app.use(
    session({
        key: 'user_sid',
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        //store: new MySQLStore({}, db),
        //Cookies set up; 
        cookie: {secure: false}
    })
)

//Set up routes
/*
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})
    */
// app.use('/auth', authRoutes)
app.use('/patients', patientRoutes);
// app.use('/doctors', doctorRoutes)
// app.use('/appointments', appointmentRoutes)


//Start server
const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost: ${PORT}`)
});