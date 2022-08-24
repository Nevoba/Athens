const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;
const routes = require('./Routes/API')



const MONGODB_URI = 'mongodb+srv://skinnypenis:skinnypenis@pollbox.sukpbvr.mongodb.net/?retryWrites=true&w=majority'


//DB connection
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('mongoose is connected bae');
});



app.use(express.json());
app.use(express.urlencoded({extended: false}));

//HTTP request logger
app.use(morgan('tiny'));
app.use('/api', routes)




app.listen(PORT, console.log(`Server is starting at port: ${PORT}`));
