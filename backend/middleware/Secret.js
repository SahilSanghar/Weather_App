const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (user) => {
    // Create the payload with the user's id and email (or any other info you want to include)
    const payload = {
        id: user._id,
        email: user.email
    };

    // Generate a token with the payload and a secret key, setting an expiration time
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
};

module.exports = generateToken;
