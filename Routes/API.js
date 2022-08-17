const express = require('express');

const router = express.Router();

const BallotBox = require('../Models/BallotBox')

//Routes
router.get('/api', (req,res) => {

    BallotBox.find({ })
    .then((data) => {
        console.log('Data:', data);
        res.json(data);
    })
    .catch((error)=> {
        console.log('Data:', error);
    });
});



router.get('/api/name', (req,res) => {
    const data = {
        username: 'Nevo',
        age: 22
    };

});


module.exports = router