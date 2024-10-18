const mongoose = require("mongoose")

const connectDB = async (uri)=>{
    try {
        await mongoose.connect(uri);
        console.log("Connected to database sucessfully");
    } catch (error) {
        console.error(error)
    }
}

module.exports = connectDB;