const express = require('express');

const userRouter = require('./routes/user.router');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
