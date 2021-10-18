const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const router = require('./routes');
const { handleNonexistentRoute, handleError } = require('./middlewares');
const { MONGODB_CONN_URI, PORT } = require('./configs/config');

const app = express();

mongoose
    .connect(MONGODB_CONN_URI)
    .then(() => console.log('connected to database'))
    .catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);
app.use(handleNonexistentRoute);
app.use(handleError);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
