//Implement patient Routes

//Import dependencies
const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

const path = require('path')
const db = require(path.join(__dirname, '..', 'config', 'db'))

//Create a new patient
router.post('/register', patientController.registerPatient)

//Update a patient by ID
router.put('/updatePatient/:id', patientController.updatePatient)

//Read All Patients(Admin Only )
router.get('/readPatients', patientController.getAllPatients)

//Delete a patient by ID
router.delete('/deletePatient/:id', patientController.deletePatient)


//Export the router to use it in index.js
module.exports = router;

