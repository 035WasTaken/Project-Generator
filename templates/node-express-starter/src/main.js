const express = require('express');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const dotenv = require('dotenv').config({ path: path.join('..', 'process.env') });

const app = express();

app.use(express.static(path.join('..', 'public')));

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(process.env.PORT, () => {
    console.log(chalk.blue(`App is listening on port ${process.env.PORT}`));
})