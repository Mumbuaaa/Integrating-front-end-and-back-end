const db = require('../config/db');

//Book a new appointment
exports.createAppointment = (req, res) => {
    const { patient_id, doctor_id, appointment_date, appointment_time, status} = req.body;
    const sql = `
    INSERT INTO appointments ( patient_id, doctor_id, appointment_date, appointment_time, status)
    VALUES(?, ?, ?, ?, ?)
    `;
    db.query(sql, [patient_id, doctor_id, appointment_date, appointment_time, status], (err) => {
        if (err) {
            return res.status(500).send('Error booking appointments');

        }
        res.status(201).send('Appointment booked successfully!')
    });
};

//Get all appointments for a patient or doctor
exports.getAppointments = (req, res) => {
    const { patient_id, doctor_id, appointment_date, appointment_time, status} = req.query;
    const sql = role === 'doctor'
    ? `SELECT * FROM appointments WHERE doctor_id = ?`
    : `SELECT * FROM appointments WHERE patient_id = ?`
    db.query(sql, [patient_id, doctor_id, appointment_date, appointment_time, status], (err, results) => {
        if(err){
            return res.status(201).send('Error fetching appointments')
        }
        res.json(results);

    });
};

//Update an appointment(e.g reschedule)
exports.updateAppoinment = (req, res) => {
    
    
}
