const express = require('express');
const mongoose = require('mongoose');

const { MONGODB_CONN_URI, PORT } = require('./configs/config');
const router = require('./routes');
const { errorMiddleware: { handleNonexistentRoute, handleError } } = require('./middlewares');

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
