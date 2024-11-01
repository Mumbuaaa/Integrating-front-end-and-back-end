const db = require('./config/db')
const express = require('express')
const doctorController = require('../controllers/doctorController');
const router = require('./patients');

//Create Doctor profile
router.post('/createDoctor', doctorController.createDoctor)

//Read(Fetch Doctors)
router.get('/fetchDoctors', doctorController.getAllDoctors)

//Update(Add Doctors)
router.put('/updateDoctors', doctorController.updateDoctor)

//Delete (delete)
router.delete('/deleteDoctor', doctorController.deleteDoctor)

module.exports = router;