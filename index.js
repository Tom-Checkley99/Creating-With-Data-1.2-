const express = require('express');
const Datastore = require('nedb');

const app = express();
app.listen(3000, () => console.log("listening at port 3000"));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

const database = new Datastore('database.db');
database.loadDatabase();


	app.get('/api', (request, response) => {
database.find({}).sort({timestamp: 1}).exec(function (err,docs){
 if (err) {
  console.log(err);
  response.end();
  return;
 }
response.json(docs);
});
});

app.post('/api', (request, response) => {
	const data = request.body;
	console.log(data);
	const timestamp = Date.now();
	data.timestamp = timestamp;
	database.insert(data);
	response.json(data); 

});

