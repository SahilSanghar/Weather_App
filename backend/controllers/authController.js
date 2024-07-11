const User = require('../models/User');
const bcrypt = require('bcryptjs');
const generateToken = require('../middleware/Secret');

const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        const newUser = new User({
            email,
            password
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user', error });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Received login data:', req.body); // Log received data

        // Check if user already exists
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found');
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        console.log('User found:', user); // Log the user object

        // Log the stored hashed password
        console.log('Stored hashed password:', user.password);

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password match result:', isMatch); // Log the result of the comparison

        if (!isMatch) {
            console.log('Password does not match');
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        console.log('Password matches'); // Log when the password matches

        const token = generateToken(user);
        res.cookie('authToken', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            sameSite: 'strict',
            secure: false, // Set to true in production
        });

        res.status(200).json({ message: 'User logged in successfully' });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Error logging in user', error });
    }
};

const logout = async (req, res) => {
    res.clearCookie('authToken');
    res.status(200).json({ message: 'User logged out successfully' });
};

module.exports = { register, login, logout };