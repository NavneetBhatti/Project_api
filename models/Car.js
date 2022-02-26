const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = Schema({
  make: {
    type: String,
    require: true,
  },
  model: {
    type: String,
    require: [true, 'please add model'],
  },
  year: {
    type: Number,
    require: true,
  },
});

module.exports = mongoose.model('Car', carSchema);
