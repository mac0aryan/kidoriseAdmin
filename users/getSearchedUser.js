const express = require('express');
const router = express.Router();
const { User } = require('../schemas/userSchema');

router.post('/', async (req, res) => {
    const { search } = req.body;

    try {
        let users;

        if (search) {
            const searchRegex = new RegExp(search, 'i'); // case-insensitive search
            users = await User.find({
                $or: [
                    { firstName: { $regex: searchRegex } },
                    { lastName: { $regex: searchRegex } },
                    { email: { $regex: searchRegex } }
                ]
            });
        } else {
            users = await User.find({});
        }

        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
