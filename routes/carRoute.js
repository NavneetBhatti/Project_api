const express = require('express');
let cars = require('../models/cars');
const uuid = require('uuid');

const router = express.Router();

//route Get api/cars
//desc Get all cars
router.get('/', (req, res) => {
  res.json(cars);
});

//route Get api/cars/:id
//desc Get car by id
router.get('/:id', (req, res) => {
  const car = cars.find((t) => t.id == req.params.id);
  if (!car) {
    return res.status(404).send('car not found');
  }
  res.send(car);
});

//route Post api/cars
//desc Insert car
router.post('/', (req, res) => {
  if (!req.body.make) {
    return res.status(400).json({ error: 'Missing data' });
  }
  const newCar = {
    id: uuid.v4(),
    make: req.body.make,
    model: req.body.model,
    year: req.body.year,
  };
  cars.push(newCar);
  res.send(cars);
});

//route delete api/cars
//desc delete car by id
router.delete('/', (req, res) => {
  //find the car by id
  const car = cars.find((t) => t.id == req.body.id);
  if (!car) {
    return res.status(400).json({ error: 'Task not found' });
  }

  cars = cars.filter((t) => t.id !== car.id);

  res.send(cars);
});

//route put api/cars
//desc update car
//access public
router.put('/', (req, res) => {
  //find the car by id
  const car = cars.find((t) => t.id == req.body.id);
  if (!car) {
    return res.status(400).json({ error: 'Task not found' });
  }

  cars = cars.filter((t) => {
    if (t.id == req.body.id) {
      (t.make = req.body.make),
        (t.model = req.body.model),
        (t.year = req.body.year);
    }
    return t;
  });
  res.send(cars);
});

module.exports = router;
