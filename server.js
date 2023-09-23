const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const {bookRouter} = require('./Routes/bookRoute');

dotenv.config({path: './config.env'});

const app = express();
app.use(express.json());

app.get('/api/', function (req, res) {
    return res.status(200).json({
        status: 'success',
        message: 'Wellcome',
    });
});

app.use('/api/books/', bookRouter);

const PORT = process.env.PORT;

app.listen(PORT, function () {
    console.log('Connecting with DB...');
});

const DB = process.env.DATABASE;

mongoose
    .connect(DB)
    .then(function () {
        console.log('DB Connection Successfull.');
        console.log(`http://127.0.0.1:${PORT}/api/`);
    })
    .catch(function (error) {
        // console.log(error);
        console.log('DB Connection Error');
    });
