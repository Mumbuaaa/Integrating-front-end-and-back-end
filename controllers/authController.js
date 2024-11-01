const db = require('../config/db'); // Import database connection
const bcrypt = require('bcrypt'); // For password hashing
// const jwt = require('jsonwebtoken'); // For creating tokens

// Register a new user (patient, doctor, or admin)
const registerUser = async (req, res) => {
    const { email, password, userType } = req.body; // Assuming userType indicates whether it's a patient, doctor, or admin

    // Validate input
    if (!email || !password || !userType) {
        return res.status(400).send('All fields are required');
    }

    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into the database
        const sql = `INSERT INTO users (email, password, user_type) VALUES (?, ?, ?)`;
        await db.query(sql, [email, hashedPassword, userType]);

        res.status(201).send('User registered successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering user');
    }
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }

    try {
        // Check if user exists
        const sql = `SELECT * FROM users WHERE email = ?`;
        const [user] = await db.query(sql, [email]);

        if (!user) {
            return res.status(401).send('Invalid credentials');
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send('Invalid credentials');
        }

        // Create a JWT token
        const token = jwt.sign({ id: user.id, userType: user.user_type }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error logging in');
    }
};

// Logout user
const logoutUser = (req, res) => {
    // Clear the session or token (depending on your implementation)
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Error logging out');
        }
        res.status(200).send('Logged out successfully');
    });
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
};
