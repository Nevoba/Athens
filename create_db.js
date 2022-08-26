const express = require('express')
const mongoose = require('mongoose')
const Ballot = require('./Models/Ballot')
const Country = require('./Models/Country')
const app = express()
const { getCode, getName, getData } = require("country-list");





uri = "mongodb+srv://skinnypenis:skinnypenis@pollbox.sukpbvr.mongodb.net/?retryWrites=true&w=majority"

async function con (){
    try{
        await mongoose.connect(uri)
    }catch(e){console.error(e)}
}

async function rev(){
    await Country.deleteMany({})
    }

    function ne(){
        getData().map(country => {
            const nevote = new Country({ countryName: country.name, countryId: country.code, counted: false}) 
            nevote.save()
        })

        }

con()


ne()



/* app.listen(8000, ()=> {console.log("pl")}) */

