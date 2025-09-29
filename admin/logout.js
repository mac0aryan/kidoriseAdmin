const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    try {
         res
      .clearCookie('jwtoken', {
        path: '/',
        httpOnly: true,
        sameSite: 'strict'
      })
      .status(200)
      .json({ message: 'Cookie cleared successfully' });
    } catch (error) {
        console.log(error);
        res.status(500)
    }
   
});

module.exports = router;
