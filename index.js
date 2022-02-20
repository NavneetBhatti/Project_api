const express = require('express');
const carRoute = require('./routes/carRoute');
const app = express();

app.use(express.json());
app.use('/api/cars', carRoute);

app.listen(5000, () => {
  console.log('server started');
});
