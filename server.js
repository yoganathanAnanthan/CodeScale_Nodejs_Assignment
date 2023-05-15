require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const connectDB = require('./utilities/dbConnection')
const PORT = process.env.PORT || 3500

app.use(cors())
app.use(express.json())
connectDB()

app.get("/",(req,res)=>{
    res.send("<h3> User Management API</h3>");
});

// users and authentication routes
app.use('/users', require('./routes/userRoute'))
app.use('/auth', require('./routes/authRoute'))

// if mongoDB sucessfully connected
mongoose.connection.once('open',()=>{
    console.log('Connected to MongoDB')
    app.listen(PORT,()=> console.log(`SERVER RUNNING ON PORT ${PORT}`))
})
// mongoDB connection error
mongoose.connection.on('error',err=>{
    console.log(err)
})

