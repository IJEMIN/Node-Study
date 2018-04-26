const Joi = require('joi');
const express = require('express');
const app = express();
const genres = require('./routes/genres');

app.use(express.json()); // Use Middleware
app.use('/api/genres/',genres);


app.get('/', (req, res) => res.send('Welcome to Vidly'));

const port = 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));