const mongoose = require('mongoose')




//Schema
const Schema = mongoose.Schema;
const BallotSchema = new Schema({
    countryName: String,
    countryId: String,
    counted: Boolean,
    date: {
        type: String,
        default: Date.now()
    }
})

//Model
const Ballot = mongoose.model('Ballot', BallotSchema)

module.exports = Ballot;