const express = require('express');
const ejs = require('ejs').__express;
const fs = require('fs');

const app = express();

const port = 8080;

// config view engine
app.set('view engine', 'ejs');
app.set('views', './views');
app.engine('ejs', ejs);

// get data from database
const rawData = fs.readFileSync('./database.json');
const data = JSON.parse(rawData);

app.listen(port, () => {
	console.log(`Server is listening on http://localhost:${port}`);
});

// home
app.get('/', (req, res) => {
	const exams = data;
	res.render('home', { exams });
});

// detail exam
app.get('/detail/:slug', (req, res) => {
	const slug = req.params.slug;
	const examData = data[slug - 1];
	res.render('exam-detail', { examData });
});
