const express=require('express');
const cors=require('cors')
const { connection } = require('./configs/db');
const jobRoutes = require('./routes/Jobs.routes');
const app=express();
app.use(cors())
app.use(express.json());

app.use('/job',jobRoutes)

app.listen(8080,async()=>{
    try {
        await connection
        console.log("Connected to DB!!")
    } catch (error) {
        console.log("Something went Wrong!!")
    }
    console.log("Server is Running!!");
})