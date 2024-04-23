const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const logout = (req, res) => {
    if (!req.session._id) {
        return res.status(401).json({ message: 'User not logged in ' });
    }
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.json({ message: 'Logged out successfully' });
    });
}

module.exports = logout;