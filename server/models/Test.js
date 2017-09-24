const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var testingInput = new Schema({
  text:{
    type:String
  }
});
var userData = new Schema({
  name:{
    type:String
  },
  id:{
    type:String
  },
  idOfPair:{
    type:String
  },
  attentionValue:{
    type:Number
  }
});
var TextInput = module.exports = mongoose.model('testinginput', testingInput, 'testinginput');
