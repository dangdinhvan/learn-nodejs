// const express = require('express');
// const app = express();
// const port = 8080;
//
// app.get('/', (req, res) => {
// 	res.send('This is home!');
// });
//
// app.get('/about', (req, res) => {
// 	res.send('This is about!');
// });
//
// app.listen(port, () => {
// 	console.log(`Example app listening on port ${port}`);
// });

const fs = require('fs');
const key = fs.readFileSync('cert/CA/localhost/localhost.decrypted.key');
const cert = fs.readFileSync('cert/CA/localhost/localhost.crt');

const express = require('express');
const app = express();
const https = require('https');
const server = https.createServer({ key, cert }, app);

const port = 8080;
server.listen(port, () => {
	console.log(`Server is listening on https://localhost:${port}`);
});

app.get('/', (req, res, next) => {
	res.status(200).send('This is Home');
});

app.get('/about', (req, res) => {
	res.send('This is about!');
});
