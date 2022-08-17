const mongoose = require('mongoose')




//Schema
const Schema = mongoose.Schema;
const BallotBoxSchema = new Schema({
    title: String,
    body: String,
    date: {
        type: String,
        default: Date.now()
    }
})

//Model
const BallotBox = mongoose.model('BlogPost', BallotBoxSchema)

module.exports = BallotBox;