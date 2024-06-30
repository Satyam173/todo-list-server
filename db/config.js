const mongoose = require("mongoose");
require('dotenv').config()

const connectToDb= async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)  
        console.log("Connected to db")
    } catch (error) {
        console.log("Some error occured")
    }
}

connectToDb();