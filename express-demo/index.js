const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

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
	res.send('Hello World!!!');
});

app.get('/api/courses', (req, res) => {
	res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
	const course = courses.find(c => c.id === parseInt(req.params.id));
	if (!course) res.status(404).send('The course with the given ID was not found');
	res.send(course);
});


app.post('/api/courses', (req, res) => {
	// Define Schema
	const { error } = validateCourse(req.body); // Object destruction. result.error
	if (error) {
		res.status(400).send(error.details[0].message);
		return;
	}

	const course = {
		id: courses.length + 1,
		name: req.body.name
	}

	courses.push(course);
	res.send(course);

});


app.put('/api/courses/:id', (req,res) => {
	// Look up the course
	// If not exsiting, return 404
	const course = courses.find(c => c.id === parseInt(req.params.id));
	if (!course) res.status(404).send('The course with the given ID was not found');

	//const result = validateCourse(req.body);
	const { error } = validateCourse(req.body); // Object destruction. result.error
	if (error) {
		res.status(400).send(error.details[0].message);
		return;
	}

	course.name = req.body.name;
	res.send(course);
} );

function validateCourse(course) {
	const schema = {
		name: Joi.string().min(3).required()
	};

	return Joi.validate(course, schema);
}


// PORT
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
