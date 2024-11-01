const db = require('../config/db')
const express = require('express')

//Create a new doctor
exports.createDoctor = (req, res) => {
    const {first_name, last_name, email, specialization, phone, schedule} = req.body;
    const sql = `
    INSERT INTO doctors(first_name, last_name, email, specialization, phone, schedule)
    VALUES(?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, [first_name, last_name, email, specialization, phone, schedule], (err) => {
        if(err){
            return res.status(500).send('Error creating doctor');

        }
        res.status(201).send('Doctor added successfully!')
            
    });
};

//Read all doctors
exports.getAllDoctors = (req, res) => {
    const sql = `SELECT * FROM doctors`;
    db.query(sql, (err, results) => {
        if(err){
            res.status(500).send('Error fetching doctors')
        }
        res.json(results);
    });
};

//Update doctor details
exports.updateDoctor = (req, res) => {
    const {id} = req.params;
    const{ first_name, last_name, email, specialization, phone, schedule} = req.body;
    const sql = ` 
    UPDATE doctors SET first_name = ?, last_name = ?, email = ? , specialization = ?, phone = ?, schedule = ?
    WHERE id = ?
    `
    db.query(sql, [first_name, last_name, email, specialization, phone, schedule], (err) => {
        if (err) {
            return res.status(500).send('Error updating doctor')
        }
        res.send('Doctor update successfully!')
    });
};

//Delete doctor profile
exports.deleteDoctor = (req, res) => {
    const {id} = req.params;
    const sql = `
    DELETE FROM doctors WHERE id = ?
    `;
    db.query(sql, [id], (err) => {
        if (err){
            return res.status(500).send('Error deleting doctor')
        }
        res.send('Doctor deleted successfully!')
    })
}