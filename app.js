const express = require('express');
const app = express();
const port = 8081;

app.get('/', function (request, response) {
	response.send(`
		<h1>intensive-f1-rest-api</h1>
		<p>REST API (умовний бекенд для інтенсиву)</p>
	`);
});

app.get('/v2/check', function (request, response) {
	response.json({ message: 'Hello World!' });
});

app.post('/v2/subscribe', require('./api/subscribe-form'));

app.listen(port, function () {
	console.log(`App listening on port ${port}!`);
});
