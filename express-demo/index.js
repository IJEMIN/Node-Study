const debug = require('debug')('app:startup'); // define new namespace for writing debugging message
// const dbDebugger = require('debug')('app:db');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');

const Joi = require('joi');
const logger = require('./logger');
const express = require('express');
const app = express();


// express load pug
app.set('view engine','pug');
app.set('views','./views'); // override views path

// process.env.NODE_ENV // init value : undefined

app.use(express.json());
app.use(express.urlencoded({extended: true})); // key=value&key=value
app.use(express.static('public'));
app.use(helmet());

//Configureation
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server Name: ' + config.get('mail.host'));

if(config.has('mail.password')) console.log('Mail Password: ' + config.get('mail.password'));


if(app.get('env') === 'development') {
	app.use(morgan('tiny'));
	//startupDebugger('Morgan enabled');
	debug('Morgan enabled'); // console.log
}

// Db work
// dbDebugger('Connected to the database');


app.use(logger);

app.use(function(req,res,next) {
	console.log('Authenticating...');
	next(); //without this, control terminated
});


const courses = [
	{ id: 1, name: 'course1' },
	{ id: 2, name: 'course2' },
	{ id: 3, name: 'course3' },
];

// Corespond to HTTP
// app.get()
// app.post()
// app.put();
// app.delete()

app.get('/', (req, res) => {
	res.render('index', { title: 'My Express App', message: 'Hello'});
});

app.get('/api/courses', (req, res) => {
	res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
	const course = courses.find(c => c.id === parseInt(req.params.id));
	if (!course) return res.status(404).send('The course with the given ID was not found');
	res.send(course);
});


app.post('/api/courses', (req, res) => {
	// Define Schema
	const { error } = validateCourse(req.body); // Object destruction. result.error
	if (error) return res.status(400).send(error.details[0].message);

	const course = {
		id: courses.length + 1,
		name: req.body.name
	}

	courses.push(course);
	res.send(course);

});


app.put('/api/courses/:id', (req, res) => {
	// Look up the course
	// If not exsiting, return 404
	const course = courses.find(c => c.id === parseInt(req.params.id));
	if (!course) return res.status(404).send('The course with the given ID was not found');

	//const result = validateCourse(req.body);
	const { error } = validateCourse(req.body); // Object destruction. result.error
	if (error) return res.status(400).send(error.details[0].message);

	course.name = req.body.name;
	res.send(course);
});


app.delete('/api/courses/:id', (req, res) => {
	// Look up the course
	// Not exisiting, return 404
	const course = courses.find(c => c.id === parseInt(req.params.id));
	if (!course) return res.status(404).send('The course with the given ID was not found');

	// Delete
	const index = courses.indexOf(course);
	courses.splice(index, 1);

	// Return the same course
	res.send(course);
});

function validateCourse(course) {
	const schema = {
		name: Joi.string().min(3).required()
	};

	return Joi.validate(course, schema);
}


// PORT
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
