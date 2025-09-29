const express = require('express');
const router = express.Router();
const Products = require('../schemas/productSchema');
const { uploadMultiple } = require('../mediaHandler/uploadMultiple');

router.post('/', uploadMultiple, async (req, res) => {
    const {
        title,
        generalInfo,
        offerPrice,
        MRP,
        SKU,
        trackQuantity,
        continueselling,
        committed,
        status,
        brandName,
        material,
        finishType,
        color,
        style,
        weight,
        dimension,
        productType,
        vendor,
        productID
    } = req.body;
    const inventories = JSON.parse(req.body.inventories);
    const specialities = JSON.parse(req.body.specialities);
    const damaged = JSON.parse(req.body.damaged);
    console.log(damaged);
    const qualityControl = JSON.parse(req.body.qualityControl);
    const saftey = JSON.parse(req.body.saftey);
    const other = JSON.parse(req.body.other);
    const available = JSON.parse(req.body.available);
    const collections = JSON.parse(req.body.collections);
    const selectedCategories = JSON.parse(req.body.selectedCategories);
    const deleteFromDBImg = JSON.parse(req.body.deleteFromDBImg);
    if (req.files) {
        const imagesPath = req.files.map((image) => ({
            preview: `${image.filename}`
        }));

        try {
            let product = await Products.findOne({ _id: productID });
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            const oldImagesArray = product.images;
            let newImagesArray = oldImagesArray.filter((img) => !deleteFromDBImg.includes(img.preview));

            newImagesArray = [...newImagesArray, ...imagesPath];

            const inventory = inventories.map((inventory, index) => ({
                locationName: inventory.locationName,
                quantity: {
                    unavailable: {
                        damaged: Number(damaged[index]),
                        qualityControl: Number(qualityControl[index]),
                        safetyStock: Number(saftey[index]),
                        other: Number(other[index])
                    },
                    committed: Number(committed),
                    available: Number(available[index])
                }
            }));
            product.title = title;
            product.images = newImagesArray;
            product.description = {
                specialities,
                generalInfo
            };
            product.pricing = {
                offerPrice,
                MRP
            };
            product.SKU = SKU;
            product.trackQuantity = trackQuantity;
            product.continueSellingStockWhenOutOfStock = continueselling;
            product.inventory = inventory;
            product.markModified('inventory');
            product.status = status;
            product.additionalInfo = {
                brandName,
                material,
                finishType,
                color,
                style,
                weight,
                dimension
            };
            product.productOrganization = {
                productType,
                vendor,
                collections,
                selectedCategories
            };
            product.markModified('inventory');
            await product.save();
            res.status(200).json({ message: 'Product updated successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Database error' });
        }
    } else {
        res.status(400).json({ message: 'No files uploaded' });
    }
});

module.exports = router;
