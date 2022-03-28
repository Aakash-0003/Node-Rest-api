const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');

//defining schema for user collection

const userSchema = mongoose.Schema({
    name: String,
    age: Number,
    location: String,
    roll: Number
});
//console.log(userSchema);


module.exports = mongoose.model('User', userSchema); // to convert the schema to model
/* {
    "name": "kobe",
    "age": "17",
    "location": "LA",
    "roll": "4"
} */