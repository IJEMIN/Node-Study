const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));


const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    data: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {

    const course = new Course({
        name: 'Angular Course',
        author: 'Mosh',
        tags: ['angular', 'frontend'],
        isPublished: true
    });

    const result = await course.save();
    console.log(result);
}

async function getGetcourse() {
    const pageNumber = 2;
    const pageSize = 10;
    // /api/courses?pageNumber=2&pageSize=10

    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte (greater than or equal to)
    // lt (less than)
    // lte (less than or equal to)
    // in
    // nin (not in)
    const course = await Course
        .find({ author: 'Mosh', isPublished: true })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({ name: 1 })

    console.log(course);
}

async function updateCourse(id) {
    // Approach: Query first
    // findById()
    // Modify its properties
    // save()

    // Approach: Update first
    // Update directly
    // Optionally: get the updated document

    const course = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'Jason',
            isPublished: true
        }
    },{new: true});
    console.log(course);
}

updateCourse('5aed70fa80bb9e09823ce374');