const express = require('express');
const router = express.Router();
const Store = require('../schemas/storeDetailsSchema');
router.post('/', async (req, res) => {
    const { locationData } = req.body;
    try {
        const store = await Store.findOne({});

        if (store) {
            store.billingInformation = locationData;
            await store.save();
            res.status(200)
        } else {

            const newStoreBillingAddress = new Store({
                billingInformation: locationData
            });
            await newStoreBillingAddress.save();
            res.status(200).json({ "message": "Saved Successfully" });
        }
    } catch (error) {
        console.error("Error saving store billing information:", error);
        res.status(500).json({ "message": "Internal Server Error" });
    }
});

module.exports = router;
