const express = require('express');
const app = express();

// Corespond to HTTP
// app.get()
// app.post()
// app.put();
// app.delete()

app.get('/',(req,res)=> {
	res.send('Hello World!!!');
});

app.get('/api/courses',(req,res) => {
	res.send([1,2,3]);
});

app.get('/api/courses/:id',(req,res) => {
	res.send(req.params.id);
});

app.get('/api/courses/:year/:month',(req,res) => {
	res.send(req.query);
});

// PORT
const port = process.env.PORT || 3000;

app.listen(port,()=> console.log(`Listening on port ${port}...`));