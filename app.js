const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const contactsRouter = require("./api/contacts");
const usersRouter = require("./api/users");

const app = express();

const formatsLogger =
    app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

require('./config/config-passport');

app.use("/api/contacts", contactsRouter);
app.use('/api/users', usersRouter);;

app.use((_, res, __) => {
    res.status(404).json({
        status: "error",
        code: 404,
        message: "Use api on routes: /api/",
        data: "Not found",
    });
});

app.use((err, _, res, __) => {
    console.log(err.stack);
    res.status(500).json({
        status: "fail",
        code: 500,
        message: err.message,
        data: "Internal Server Error",
    });
});

module.exports = app;
