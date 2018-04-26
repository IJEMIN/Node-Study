const debug = require('debug')('app:startup'); // define new namespace for writing debugging message
// const dbDebugger = require('debug')('app:db');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');

const Joi = require('joi');
const logger = require('./middleware/logger');

const courses = require('./routes/courses');
const home = require('./routes/home');

const express = require('express');
const app = express();


// express load pug
app.set('view engine', 'pug');
app.set('views', './views'); // override views path

// process.env.NODE_ENV // init value : undefined

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // key=value&key=value
app.use(express.static('public'));
app.use(helmet());

app.use('/api/courses',courses); // use courses module on that path
app.use('/',home);


//Configureation
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server Name: ' + config.get('mail.host'));

if (config.has('mail.password')) console.log('Mail Password: ' + config.get('mail.password'));


if (app.get('env') === 'development') {
	app.use(morgan('tiny'));
	//startupDebugger('Morgan enabled');
	debug('Morgan enabled'); // console.log
}

// Db work
// dbDebugger('Connected to the database');


app.use(logger);

app.use(function (req, res, next) {
	console.log('Authenticating...');
	next(); //without this, control terminated
});




// Corespond to HTTP
// app.get()
// app.post()
// app.put();
// app.delete()

function validateCourse(course) {
	const schema = {
		name: Joi.string().min(3).required()
	};

	return Joi.validate(course, schema);
}


// PORT
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
