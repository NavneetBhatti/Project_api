const express = require('express');
const dotenv = require('dotenv').config();
const carRoute = require('./routes/carRoutesDB');
const app = express();
const connectDB = require('./config/connectDB');
//connect to db
connectDB();

app.use(express.json());
app.use('/api/cars', carRoute);


const PORT = process.env.PORT | 5000;
app.listen(PORT, () => {
  console.log('server started..');
});



