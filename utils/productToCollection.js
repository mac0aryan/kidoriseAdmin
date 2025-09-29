const Collection = require('../schemas/collectionSchema');
const Product = require('../schemas/productSchema');

const productToCollection = async () => {
    try {
        const products = await Product.find({});
        const collectionsArray = await Collection.find({});
        console.log(products.length, collectionsArray.length)
        for (const collection of collectionsArray) {
            const matchingProducts = products.filter(product =>
                product.productOrganization.collections.some(
                    coll => coll._id === collection._id.toString()
                )
            );
            console.log(matchingProducts.map(prod => prod._id))
            collection.products = matchingProducts.map(prod => prod._id); // or push if you're appending
            await collection.save();
        }

        console.log("Products added to collections successfully");
    } catch (error) {
        console.log("Some error occurred", error);
    }
};

module.exports= productToCollection;

