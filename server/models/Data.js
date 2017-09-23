const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var date = new Date();

var neuralInput = new Schema({

});

var Data = new Schema({
  time:date,
  neuralInput:[neuralInput]
});
