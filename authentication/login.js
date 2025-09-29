const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const Admin = require('../schemas/adminSchema');
const generateToken = require('./generateToken');

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password)

    try {
        // 1. Check if user exists
        const user = await Admin.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // 2. Compare password using bcrypt
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Username and password mismatched' });
        }

        // 3. Generate token
        const token = generateToken(user);

        // 4. Send cookie and response
        res
            .status(200)
            .cookie('jwtoken', token, {
                secure: true,
                sameSite: "none",
                path: '/',
                expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
                httpOnly: true,
            })
            .json({
                message: 'Login successful, cookie sent',
                id: user._id,
                name: user.name || user.firstName || '',
            });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
