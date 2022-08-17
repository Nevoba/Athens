const express = require('express');

const router = express.Router();

const BallotBox = require('../Models/BallotBox')

//Routes

router.get('/name', (req,res) => {
    console.log('Snitch');
    const data = {
        username: 'Nevo',
        age: 22
    };
    res.json(data);
});



router.get('/', (req,res) => {

    BallotBox.find({ })
    .then((data) => {
        console.log('BAE');
        res.json(data);
    })
    .catch((error)=> {
        console.log('Data:', error);
    });
});






module.exports = router;