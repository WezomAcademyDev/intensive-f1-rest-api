const express = require('express');
const app = express();
const port = 8081;

app.get('/v2/check', function (request, response) {
	response.json({ message: 'Hello World!' });
});

app.post('/v2/subscribe', require('./api/subscribe-form'));

app.listen(port, function () {
	console.log(`App listening on port ${port}!`);
});
