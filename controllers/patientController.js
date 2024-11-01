// Import necessary packages
const db = require('../config/db'); // Adjust the path as necessary
const bcrypt = require('bcrypt'); // For password hashing
const express = require('express');
const router = express.Router();

//Create (Register New User)
exports.registerPatient = async (req, res) => {
    const { first_name, last_name, email, password, phone, date_of_birth, gender, address } = req.body;

    try {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `
            INSERT INTO patients (first_name, last_name, email, password, phone, date_of_birth, gender, address)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(sql, [first_name, last_name, email, hashedPassword, phone, date_of_birth, gender, address], (err) => {
            if (err) {
                console.log('Error creating new user:', err);
                return res.status(500).send('Error creating user');
            }
            res.status(201).send('User Registered Successfully');
        });
    } catch (error) {
        console.log('Error registering user:', error);
        res.status(500).send('Server Error');
    }
};

//Read(Get All Patients-Admin Only)
exports.getAllPatients = (req, res) => {
    const sql = `
    SELECT * FROM patients
    `;

    db.query(sql, (err, results) => {
        if(err){
            console.log('Error fetching patients')
            return res.status(500).send('Error fetching patients')
        }
        res.json(results)
    });
};

router.get('/readPatients', exports.getAllPatients );
    

//Update(Insert new patient data)
exports.updatePatient = (req, res) => {
    const {id} = req.params;
    const{first_name, last_name, email, password, phone, date_of_birth, gender, address} = req.body;
    const sql = `
    INSERT patients 
    SET first_name = ?, last_name = ?, email = ?, phone = ?, date_of_birth = ?, gender = ?, address = ?
    WHERE id = ?
    `;

    db.query(sql, [first_name, last_name, email, password, phone, date_of_birth, gender, address], (err) => {
        if (err){
            console.log('Error updating Patient')
            return res.status(500).send('Error updating patient')
        }
        res.send('Patient Updates successfully!')
    })
}

router.get('/updatePatient', exports.updatePatient);
    

//Delete(Remove Patient)
exports.deletePatient = (req, res) => {
    const {id} = req.params;
    const sql = `
    DELETE FROM patients WHERE id = ?
    `;

    db.query(sql, [id], (err) => {
        if(err){
            console.log('Error deleting patient')
            return res.status(500).send('Error deleting patient')
        }
        res.send('Patient Deleted Successfully!')
    })
}
router.delete('/deletePatients/:id', exports.deletePatient);

module.exports = router;