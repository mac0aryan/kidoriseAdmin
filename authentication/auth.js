const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secret="this is the one for all dont get confused";

router.get('/', (req, res) => {
    const token = req.cookies.jwtoken;
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        res.status(200).json({ message: 'Authenticated', user: decoded });
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
});

module.exports = router;
