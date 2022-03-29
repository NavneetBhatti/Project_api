const express = require('express');
const dotenv = require('dotenv').config();
const carRoute = require('./routes/carRoutesDB');
const userRoute = require('./routes/userRoutes');
const authRoute = require('./routes/authRoutes');
const cors = require('cors');


const app = express();
app.use(cors());

const connectDB = require('./config/connectDB');
//connect to db
connectDB();

app.use(express.json());
app.use('/api/cars', carRoute);
app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);


const PORT = process.env.PORT | 5000;
app.listen(PORT, () => {
  console.log('server started..');
});



