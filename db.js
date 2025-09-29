const mongoose= require('mongoose');
const MONGO_URI= "mongodb+srv://support_db_user:XtMkAJTMCR72CD5j@cluster0.emgfnar.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const dbConnect=async()=>{
    try {
    // Use the connection string from MongoDB Atlas
    // Example: mongodb+srv://<username>:<password>@cluster0.mongodb.net/Kidorise
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB Atlas');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1); // Exit if unable to connect
  }
}
module.exports=dbConnect;
