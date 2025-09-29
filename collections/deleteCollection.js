const express = require('express');
const router = express.Router();
const Collections = require('../schemas/collectionSchema');

router.post('/', async (req, res) => {
   const {ids} = req.body;
    try {
        await Collections.deleteMany({ _id: { $in: ids } });

        res.status(200).json({message: "Collection deleted"});

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" }); // Improved JSON response
    }
});

module.exports = router;
