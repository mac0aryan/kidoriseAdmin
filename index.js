
const express= require('express');
const cookieParser = require('cookie-parser');
const cors= require('cors');
const path = require('path');
const dbConnect = require('./db');
const productToCollection = require('./utils/productToCollection');
const createAdmin = require('./utils/createAdmin');
const app= express();
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://8nckg438-3001.inc1.devtunnels.ms',
    'https://8nckg438-3000.inc1.devtunnels.ms',
    'https://kidorise.in',
    'https://admin.kidorise.in'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

dbConnect();
// productToCollection();
createAdmin()

//Api's
app.get('/', (req,res)=>{
    res.send('Hello world from Kidorise')
})

//Store Api's
app.use('/saveStoreName', require('./store/saveStoreName'));
app.use('/saveStorePhone', require('./store/saveStorePhone'));
app.use('/saveStoreEmail', require('./store/saveStoreEmail'));
app.use('/saveStoreBillingAddress', require('./store/saveStoreBillingAddress'));
app.use('/saveStore', require('./store/saveStore'));
app.use('/getStoreDetails', require('./store/getStoreDetails'));
// Product Api's
app.use('/saveProduct',require('./products/addproduct'));
app.use('/getProducts', require('./products/getProducts'));
app.use('/getSingleProduct', require('./products/getsingleProducts'));
app.use('/deleteProducts', require('./products/deleteProduct'));
app.use('/editProduct',require('./products/editProduct'));

// Collections Api's
app.use('/createCollection',require('./collections/createCollection'));
app.use('/getCollections', require('./collections/getCollections'));
app.use('/getSingleCollection', require('./collections/getSingleCollection'));
app.use('/updateCollection',require('./collections/updateCollection'));
app.use('/getCategories', require('./collections/getCategories'));
app.use('/deleteFromCollections', require('./collections/deleteCollection'));

// Inventory Api's
app.use('/addLocation',require('./location/addLocation'));
app.use('/getInventoryLocations', require('./location/getLocations'));
app.use('/getInventoryProducts', require('./location/getInvertoryProducts'));

//Order Api's
app.use('/getOrders', require('./orders/getOrders'));
app.use('/getCurrentOrders', require('./orders/getCurrentOrders'));
app.use('/updateOrderStatus',require('./orders/updateOrderStatus'));

// User Api's
app.use('/getUsers', require('./users/getUsers'));
app.use('/getSearchedUser', require('./users/getSearchedUser'));

//Authentication Api's
app.use('/auth', require('./authentication/auth'));
app.use('/login', require('./authentication/login'));
app.use('/signUp', require('./authentication/signUp'));

//Coupan Api's
app.use('/createCoupon', require('./coupons/createCoupon'));
app.use('/getCoupons', require('./coupons/getCoupons'));
app.use('/deleteCoupons', require('./coupons/deleteCoupons'));
app.use('/getCouponData', require('./coupons/getCoupanData'));

//Admin Api's
app.use('/logout', require('./admin/logout'));

// Site Api's
app.use('/addImageToSiteLocation',require('./collections/uploadSiteMedia'));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(8000,()=>{
    console.log("Listining to port 8000")
})
