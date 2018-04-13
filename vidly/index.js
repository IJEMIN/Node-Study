const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json()); // Use Middleware

const genres = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'SF' },
    { id: 3, name: 'Horror' },
]

// GET

app.get('/', (req, res) => res.send('Welcome to Vidly'));

app.get('/api/genres', (req, res) => res.send(genres));

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === praseInt(req.params.id));

    if (!genre) return res.status(404).send('Can\'t find given ID');

    res.send(genre);
})

// POST

app.post('/api/genres', (req, res) => {

    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }

    genres.push(genre);
    res.send(genre);
});

app.put('/api/genres/:id', (req, res) => {

    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Can\'t find given ID');

    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    genre.name = req.body.name;
    res.send(genre);
});

app.delete('/api/genres/:id',(req,res)=> {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('Can\'t find given ID');

    const index = genres.indexOf(genre);
    genres.splice(index,1);

    res.send(genres);
});

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(2).required()
    };

    return Joi.validate(genre, schema);
}


const port = 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));