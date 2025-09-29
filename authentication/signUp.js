const express = require('express');
const router = express.Router();
const { User } = require('../schemas/userSchema');
const bcrypt = require('bcryptjs');

router.post('/', async (req, res) => {
  const { email, password, name } = req.body;
const [firstName = '', lastName = ''] = name.split(' ');

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Account already exists with this email.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      gender: '',
      mobile: ''
    });

    return res.status(201).json({ message: 'Account successfully created', email: newUser.email });
  } catch (error) {
    console.error('Registration Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
