const mongoose = require('mongoose')




//Schema
const Schema = mongoose.Schema;
const CountrySchema = new Schema({
    countryName: String,
    eliminated: Boolean,
    Id: String,

})

//Model
const Country = mongoose.model('Country', CountrySchema)

module.exports = Country;