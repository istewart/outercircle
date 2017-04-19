var express = require('express');
var anyDB = require('any-db'); // TODO:
var bodyParser = require('body-parser');

var app = express();

// serve static files
app.use(express.static('dist'));
app.use(express.static('img'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// set up a connection pool
var db = anyDB.createPool( // TODO: need to transition to postgres
  'sqlite3://outercircle.db', // for prod
  {min: 2, max: 8}
);

// create a post for a given donor // TODO: security, cookies, auth
app.post('/post', function(request, response) {
  console.log('- Request received /post');
  
  const donor = request.body.donor;
  const body = request.body.body;
  const time = new Date().getTime();

  var sql = 'INSERT INTO post (donor, body, time) \
            VALUES (?, ?, ?)';
  db.query(sql, [donor, body, time], function(error, result) {
    const id = result.lastInsertId; // todo unused

    // TODO: error handling and security and auth and xss and csrf
    sql = 'SELECT name, profile_image FROM donor WHERE id = ?';
    db.query(sql, [donor], function(error, result) {
      response.json({
        name: result.rows[0].name,
        profile_image: result.rows[0].profile_image,
        donor: donor,
        body: body,
        time: time,
      });
    });
  });
});

// retrieve the posts for a feed
app.get('/posts', function(request, response) {
  console.log('- Request received /posts:');

  const requester = 'todo';
  const donor = 'todo';
  const charity = 'todo';

  var sql = 'SELECT d.id AS donor, d.name, d.profile_image, p.body, p.time '
    + 'FROM post AS p JOIN donor AS d '
    + 'ON p.donor = d.id WHERE time >= ?'
    + 'ORDER BY time DESC';
  db.query(sql, [0], function(error, result) {
    if (!result.rowCount) { // TODO: errors, which posts, sorting
      // todo errors, also auth
    } else {
      // return the requested posts
      response.json(result.rows);
    }
  });
});

// record a donation // TODO: security, cookies, auth
app.post('/donate', function(request, response) {
  console.log('- Request received /donate');
  
  const donor = request.body.donor;
  const charity = request.body.charity;
  const category = request.body.category; // todo this should be in charity
  const amount = request.body.amount; // todo non negative
  const time = new Date().getTime();

  var sql = 'INSERT INTO donation (donor, charity, category, amount, time) \
            VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [donor, charity, category, amount, time], function(error, result) {
    const id = result.lastInsertId; // todo unused
    response.sendStatus(200);
    // // TODO: error handling and security and auth and xss and csrf
    // sql = 'SELECT name, profile_image FROM donor WHERE id = ?';
    // db.query(sql, [donor], function(error, result) {
    //   response.json({
    //     name: result.rows[0].name,
    //     profile_image: result.rows[0].profile_image,
    //     donor: donor,
    //     body: body,
    //     time: time,
    //   });
    // });
  });
});

// retrieve the donations for TODO
app.get('/donations', function(request, response) {
  console.log('- Request received /donations:');

  const requester = 'todo';
  const donor = 'todo';
  const charity = 'todo';

  var sql = 'SELECT c.name, d.amount, d.category, d.time '
    + 'FROM donation AS d JOIN charity AS c '
    + 'ON d.charity = c.id WHERE time >= ?'
    + 'ORDER BY time DESC';
  db.query(sql, [0], function(error, result) {
    if (!result.rowCount) { // TODO: errors, which posts, sorting
      // todo errors, also auth
    } else {
      // return the requested posts
      response.json(result.rows);
    }
  });
});

// serve the home page on any other request // TODO: this is sketchy
app.get('*', function(request, response) {
  console.log('- Request received *:');
  response.sendFile('feed.html', {root : 'dist'}); // TODO: again here
});

// initialize the database the web server
init(function() {
  app.listen(8080, function(){
    console.log('- Server listening on port 8080');
  });
})

// initialize the database
function init(callback) {
  console.log('Initializing database...');

  var sql = 'CREATE TABLE IF NOT EXISTS donor ( \
    id INTEGER PRIMARY KEY AUTOINCREMENT, \
    name TEXT, \
    email TEXT, \
    description TEXT, \
    profile_image TEXT, \
    cover_image TEXT \
  );'

  db.query(sql, function(error, result) {
    console.log('Initialized donor table.');
  });

  var sql = 'CREATE TABLE IF NOT EXISTS charity ( \
    id INTEGER PRIMARY KEY AUTOINCREMENT, \
    name TEXT, \
    website TEXT, \
    description TEXT, \
    cover_image TEXT \
  );'

  db.query(sql, function(error, result) {
    console.log('Initialized donor table.');
  });

  sql = 'CREATE TABLE IF NOT EXISTS post ( \
    id INTEGER PRIMARY KEY AUTOINCREMENT, \
    donor INTEGER, \
    charity INTEGER, \
    body TEXT, \
    time INTEGER, \
    FOREIGN KEY(donor) REFERENCES donor(id), \
    FOREIGN KEY(charity) REFERENCES charity(id) \
  );'

  db.query(sql, function(error, result) {
    console.log('Initialized post table.');
  });

  sql = 'CREATE TABLE IF NOT EXISTS donation ( \
    id INTEGER PRIMARY KEY AUTOINCREMENT, \
    donor INTEGER, \
    charity INTEGER, \
    category TEXT, \
    amount INTEGER, \
    time INTEGER, \
    FOREIGN KEY(donor) REFERENCES donor(id), \
    FOREIGN KEY(charity) REFERENCES charity(id) \
  );'

  db.query(sql, function(error, result) {
    console.log('Initialized donation table.');
  });

  db.query('INSERT INTO donor '
    + '(name, email, description, profile_image, cover_image) '
    + 'VALUES (?, ?, ?, ?, ?)',
    ['Ian Stewart', 'ian_stewart@brown.edu', 'some description',
     'profile.jpg', 'cover_image'],
    function(error, result) {
      console.log('todo');
  });

  // wait a second for things to finish then start the server
  setTimeout(callback, 1000);
}
