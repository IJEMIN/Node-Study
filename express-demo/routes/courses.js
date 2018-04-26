const express = require('express');
const router = express.Router();

const courses = [
	{ id: 1, name: 'course1' },
	{ id: 2, name: 'course2' },
	{ id: 3, name: 'course3' },
];

router.get('/', (req, res) => {
    res.send(courses);
});

router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found');
    res.send(course);
});


router.post('/', (req, res) => {
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


router.put('/:id', (req, res) => {
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


router.delete('/:id', (req, res) => {
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

module.exports = router;
