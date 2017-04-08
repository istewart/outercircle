var express = require('express');
// var anyDB = require('any-db'); // TODO:
var bodyParser = require('body-parser');

var app = express();
app.use(express.static('dist')); // TODO: not sure about this

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// var db = anyDB.createPool( // TODO: do something here
//   'sqlite3://chatroom.db',
//   {min: 2, max: 8}
// );

// Set up public access for images folder
app.use(express.static("img"));

app.get('*', function(request, response) {
  console.log('- Request received *:');
  response.sendFile('feed.html', {root : "dist"}); // TODO: again here
});

// start the web server
app.listen(8080, function(){
  console.log('- Server listening on port 8080');
});

