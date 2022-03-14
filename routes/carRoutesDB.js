const express = require('express');

const authMiddleware = require('../middlewares/authMiddleware');


let Car = require('../models/Car');

const uuid = require('uuid');

const router = express.Router();

const { check, validationResult } = require('express-validator');


//route Get api/cars
//desc Get all Cars
//access public
// router.get('/', async (req, res) => {
//   try {
//     const carDB = await Car.find();
//     res.send(carDB);
//   } catch (err) {
//     return res.status(500).send('Server error');
//   }
// });

router.get('/', authMiddleware, async (req, res) => {
  try {
    const carDB = await Car.find({ user: req.user.id });
    res.send(carDB);
  } catch (err) {
    return res.status(500).send('Server error');
  }
});

//route Get api/cars/:id
//desc Get car by id
//access public
router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).send('car not found');
    }
    res.send(car);
  } catch (err) {
    return res.status(500).send('Server error');
  }
});

//route Post api/cars
//desc Insert car
//access public
router.post(
  '/',
  authMiddleware,
  [
    check('make', 'make is required').not().isEmpty(),
    check('model', 'model need to be 6 char or more').isLength({
      min: 6,
    }),
    check('year', 'year is required').not().isEmpty(),

  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
    const newCar = await Car.create({
      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
    });
    res.send(newCar);
  } catch (err) {
    return res.status(500).send('Server error');
  }
});

//route delete api/cars
//desc delete caar by id
//access public
router.delete('/', async (req, res) => {
  try {
    const car = await Car.findOneAndRemove({ _id: req.body.id });
    if (!car) {
      return res.status(404).send('car not found');
    }

    res.send('car deleted');
  } catch (err) {
    return res.status(500).send('Server error');
  }
});

//route put api/cars
//desc update car
//access public
router.put('/', async (req, res) => {
  try {
    const car = await Car.findById(req.body.id);
    if (!car) {
      return res.status(404).send('car not found');
    }
    car.make = req.body.make;
    car.model = req.body.model;
    car.year = req.body.year;
    await car.save();
    res.send(car);
  } catch (err) {
    return res.status(500).send('Server error');
  }
});

module.exports = router;
