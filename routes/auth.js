//Set up authentication routes

//Import packages
const express = require('express')
const {registerUser, loginUser, logoutUser} = require('../controllers/authController')
const router = express.Router();

//configure Routes
//1.User Registration
router.post('/register', patientController)
//Get all patients




//export Router
module.exports = router