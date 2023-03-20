const express = require('express');
const Controller1 = require('./features/feature1/controllers');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
	const controller1 = new Controller1();
	controller1.create();
});

app.get('/about', (req, res) => {
	res.send('This is about!');
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
