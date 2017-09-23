const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var testingInput = new Schema({
  text:{
    type:String
  }
});

var TextInput = module.exports = mongoose.model('testinginput', testingInput, 'testinginput');
