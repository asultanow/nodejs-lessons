const express = require('express');
const mongoose = require('mongoose');

const { MONGODB_CONNECT_URL, PORT } = require('./configs/config');
const userRouter = require('./routes/user.router');
const { logIn } = require('./controllers/user.controller');
const { verifyLogin } = require('./middlewares/user.middleware');

const app = express();

mongoose.connect(MONGODB_CONNECT_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);
app.post('/auth', verifyLogin, logIn);

app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
});
