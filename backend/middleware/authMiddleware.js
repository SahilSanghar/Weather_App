// Example authMiddleware.js

const isAuthenticated = (req, res, next) => {
    // Authentication logic here
    if (req.user) {
        // User is authenticated, proceed
        next();
    } else {
        // User is not authenticated, handle accordingly
        res.status(401).json({ error: 'Unauthorized' });
    }
};

module.exports = {
    isAuthenticated
};
