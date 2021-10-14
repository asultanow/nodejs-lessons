const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const router = require('./routes');
const { handleNonexistentRoute, handleError } = require('./middlewares');
const { MONGODB_CONN_URI, PORT } = require('./configs/config');

const app = express();

mongoose.connect(MONGODB_CONN_URI, err => {
    if (err) {
        console.log(err.message);
        return;
    }

    console.log('connected to database');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);
app.use(handleNonexistentRoute);
app.use(handleError);

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
