const express = require('express');

const router = express.Router();

const Ballot = require('../Models/Ballot')

const Country = require('../Models/Country')

//Routes

router.get('/name', (req,res) => {
    const data = {
        username: 'Nevo',
        age: 22
    };
    res.json(data);
});


//Creates a vote in ballots group
router.post('/castVote', (req,res) => {
    const data =  req.body

    const newBallot = new Ballot(data)

    newBallot.save((error) => {
        if (error){
            res.status(500).json({msg: 'Internal server error, what you gonna do about it?'})
        }else{
            res.json({
                vote: 'You voted for: ' +  req.body.countryName
            });
        }
    })

    
});


//Resets the votes db
router.post('/newElections', (req,res) => {
    try{
        Ballot.updateMany({
            "counted": false
        },
        {
            "$set":{
                "counted":true
            }
        }).exec()

    }catch(e){
        console.log("errorz")
    }finally{
        res.json({
            electionStatus: 'Clean slate'
        });
    }
    
});



//Eliminates a country by setting its eliminated attribute to true in the countries group
router.post('/eliminateCountry', (req,res) => {
    Country.updateMany(
    {
        "Id": req.body.countryId 
    },
    {
        "$set": {
            "eliminated": true
        }
    }

   ).exec()
    res.json()
});


router.get('/getVotes', (req,res) => {

    Ballot.find({ })
    .then((data) => {
        res.json(data);
    })
    .catch((error)=> {
        console.log('Data:', error);
    });
});

router.get('/getCountries', (req,res) => {

    Country.find({ })
    .then((data) => {       
        res.json(data);
    })
    .catch((error)=> {
        console.log('Data:', error);
    });
});

router.get('/getElectionsResults', (req,res) => {

    Ballot.aggregate(
        [
            {$match: {counted: false}},
            {$group: {_id: "$countryId", votes: {$count: {}} } }
        ]
    )
    .then((data) => {       
        res.json(data);
    })
    .catch((error)=> {
        console.log('Data:', error);    
    });
});








module.exports = router;