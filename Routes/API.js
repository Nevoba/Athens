const express = require('express');

const router = express.Router();

const Ballot = require('../Models/Ballot')

const Country = require('../Models/Country')

//Routes

router.get('/name', (req,res) => {
    console.log('Snitch');
    const data = {
        username: 'Nevo',
        age: 22
    };
    res.json(data);
});



router.post('/castVote', (req,res) => {
    const data =  req.body

    const newBallot = new Ballot(data)

    console.log(data)
    console.log(newBallot)

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
            {$match: {}},
            {$group: {_id: "$countryId", votes: {$count: {}} } }
        ]
    )
    .then((data) => {       
        console.log('BAE');
        res.json(data);
    })
    .catch((error)=> {
        console.log('Data:', error);    
    });
});






module.exports = router;