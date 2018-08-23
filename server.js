
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const routes = require('./routes/index');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 8000;
// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());

//database connection
mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/connectDB`, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("you are connected to your db!")
});
app.use('/', routes);

app.listen(PORT, () => {
	console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});