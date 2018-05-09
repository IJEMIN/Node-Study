
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Could not connect to MongoDB...', err));



const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    data: Date,
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {

    return await Course
        .find({ isPublished: true})
        .or([{tags: 'frontend'}, {tags: 'backend'}])
        .sort({ price: -1 })
        .select({ name: 1, author: 1,price: 1 });
}

async function displayCourses() {

    const courses = await getCourses();
    console.log(courses);
}


displayCourses();
