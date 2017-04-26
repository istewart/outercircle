"use strict";
var express = require('express');
var anyDB = require('any-db'); // TODO:
var bodyParser = require('body-parser');

var app = express();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var expressSession = require('express-session');
var bCrypt = require('bcrypt-nodejs');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');

// serve static files
app.use(express.static('dist'));
app.use(express.static('img'));

// Use express session and initialize passport
// TODO: Figure out what flash does
app.use(flash());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(expressSession({secret: 'Thisisasecretshhhh'}));
app.use(passport.initialize());
app.use(passport.session());





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

  let sql = 'INSERT INTO post (donor, body, time) \
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

// retrieve charities' and donors' name for search
app.get('/searchData', function(request, response) {
    console.log('- Request received /searchData:');
    var sql = 'SELECT d.name AS name, d.id AS id, \'D\' AS category FROM donor AS d WHERE d.name LIKE ?' +
        'UNION SELECT c.name AS name, c.id AS id, \'C\' AS category FROM charity AS c WHERE c.name LIKE ?';
    console.log(sql)
    db.query(sql, ['%'+request.query.keyWord+'%', '%'+request.query.keyWord+'%'],function(error, result) {
        if (error) {
            console.log(error)
        } else {
            // console.log(result);
            response.json(result.rows);
        }
    });
});

// retrieve the posts for a feed
app.get('/posts', isLoggedIn, function(request, response) {
  console.log('- Request received /posts:');

  const requester = request.user;
  const username = requester.rows[0].username;
  console.log("Requester: " + requester);
  console.log("Username: " + username);
  const donor = 'todo';
  const charity = 'todo';

  let sql = 'SELECT d.id AS donor, d.name, d.profile_image, p.body, p.time '
    + 'FROM post AS p JOIN donor AS d '
    + 'ON p.donor = d.id WHERE time >= ? '
    + 'ORDER BY time DESC';
  db.query(sql, [0], function(error, result) {
      if(result !== undefined) {
          if (!result.rowCount) { // TODO: errors, which posts, sorting
              // todo errors, also auth
          } else {
              // return the requested posts
              response.json(result.rows);
          }
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
    + 'ON d.charity = c.id WHERE time >= ? '
    + 'ORDER BY time DESC';
  db.query(sql, [0], function(error, result) {
      if(result !== undefined) {
        if (!result.rowCount) { // TODO: errors, which posts, sorting
          // todo errors, also auth
        } else {
          // return the requested posts
          response.json(result.rows);
        }
      }
  });
});

app.get('/title',function (request,response) {
    // let charityId = request.charityId;
    let sql= 'SELECT name, website, description, cover_image FROM charity';
    db.query(sql,function(error, result) {
        if (!result.rowCount) { // TODO: errors, which posts, sorting
            // todo errors, also auth
        } else {
            response.json(result.rows[0]);
        }
    });
});

app.get('/suggest',function(request,response){
    let id = request.query.id;
    let type = request.query.type;
    let sql= 'SELECT id, name, description, profile_image FROM ?' // TODO: not good security
        + ' WHERE id != ? ORDER BY id ASC';
    db.query(sql, [id, type], function(error, result) {
        if (!result.rowCount) { // TODO: errors, which posts, sorting
            // todo errors, also auth
        } else {
            response.json(result.rows);
        }
    });
});

app.post('/follow', function(request, response) {
  console.log('- Request received /follow');
  
  const donor = request.body.donor;
  const charity = request.body.charity;

  let sql = 'INSERT INTO following (donor, charity) \
            VALUES (?, ?)';
  db.query(sql, [donor, charity], function(error, result) {
    if (error) {
      console.log(error);
    } else {
      console.log("(donor " + donor + ", charity " + charity + ") was added successfully");
    }
  });
});

app.post('/unfollow', function(request, response) {
  console.log('- Request received /unfollow');
  
  const donor = request.body.donor;
  const charity = request.body.charity;

  let sql = 'DELETE FROM following WHERE donor = ? AND charity = ?';
  db.query(sql, [donor, charity], function(error, result) {
    if (error) {
      console.log(error);
    } else {
      console.log("(donor " + donor + ", charity " + charity + ") was deleted successfully");
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
// Alright now lets handle login with a LocalStrategy
passport.use('login', new LocalStrategy({
	passReqToCallback: true
},
	function(req, username, password, done) {
		// Check if user exists in database
		var sql = 'SELECT * FROM user WHERE username = ?';
		db.query(sql, [username], function(err, result) {
			// If there is an error, return using done method
			if (err) {
				console.log(err);
				return done(err);
			}
			if (result.rows.length === 0) {
				console.log("User doesn't exist")
				return done(null, false, req.flash('message', 'User Not Found'));
			}
      const user = result.rows[0];
			const passwd = user.password;
			// User exists so need to check if password is right
			if (!isValidUnhashedPassword(password, passwd)) {
				console.log("Invalid Password");
				return done(null, false, req.flash('message', 'Invalid Password'));
			}
			// User and password match, return user from done method
			console.log("Successful Login");
			return done(null, user);
		}); 

	}
));

// This is what we will use to compare hashes
// TODO: actually figure out how to properly hash password and sign them up
function isValidPassword(input, password) {
	return bCrypt.compareSync(password, input);
}

// Generates hash using bCrypt
var createHash = function(password){
 return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

// Use this for now since we don't need to worry about security yet
function isValidUnhashedPassword(input, password) {
	return (input === password);
}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}

// Protected routes could be written like so:
// app.get('/protected', isLoggedIn, function(req, res) { whatever })

app.post('/login', 
  passport.authenticate('login', {failWithError: true}),
  function (req, res) {
    res.send({isAuth: "authorized"});
  }, function (err, req, res, next) {
    res.status(401).send({isAuth: "unauthorized", message: err + req.flash('message')});
  });


passport.serializeUser(function (user, done) {
    console.log('serializing user:', user);
    done(null, user.id);
});

passport.deserializeUser(function (userID, done) {
    console.log('deserializing user with ID:', userID);
    var sql = 'SELECT * FROM user WHERE id = ?';
    db.query(sql, [userID], function(err, user) {
      done(err, user);
    });
});

app.post('/loggedIn', isLoggedIn, function (req, res) {
    res.send({isAuth: "authorized"});
  }, function (err, req, res, next) {
    res.status(401).send({isAuth: "unauthorized", message: err + req.flash('message')});
  });

// initialize the database
function init(callback) {
  console.log('Initializing database...');

  let sql = 'CREATE TABLE IF NOT EXISTS donor ( \
    id INTEGER PRIMARY KEY AUTOINCREMENT, \
    name TEXT, \
    email TEXT, \
    description TEXT, \
    profile_image TEXT, \
    cover_image TEXT \
  );';

  db.query(sql, function(error, result) {
    console.log('Initialized donor table.');
      db.query('INSERT INTO donor '
          + '(name, email, description, profile_image, cover_image) '
          + 'VALUES (?, ?, ?, ?, ?)',
          ['Ian Stewart', 'ian_stewart@brown.edu', 'some description',
              'profile.jpg', 'cover_image'],
          function(error, result) {
              console.log('sample donor');
      });
  });

  sql = 'CREATE TABLE IF NOT EXISTS charity ( \
    id INTEGER PRIMARY KEY AUTOINCREMENT, \
    name TEXT, \
    website TEXT, \
    description TEXT, \
    cover_image TEXT, \
    profile_image TEXT \
  );';

  db.query(sql, function(error, result) {
    console.log('Initialized charity table.');
      db.query('INSERT INTO charity '
          + '(name, website, description, cover_image, profile_image) '
          + 'VALUES (?, ?, ?, ?, ?)',
          ['Doctors Without Borders, USA', 'http://www.doctorswithoutborders.org/', 'Doctors Without Borders, USA (DWB-USA) was founded in 1990 in New York City to raise funds, create awareness, recruit field staff, and advocate with the United Nations and US government on humanitarian concerns. Doctors Without Borders/Médecins Sans Frontières (MSF) is an international medical humanitarian organization that provides aid in nearly 60 countries to people whose survival is threatened by violence, neglect, or catastrophe, primarily due to armed conflict, epidemics, malnutrition, exclusion from health care, or natural disasters.',
              'beach.jpg','profile2.jpg'],
          function(error, result) {
              console.log('sample charity');
      });
  });

   sql = 'CREATE TABLE IF NOT EXISTS following ( \
    donor INTEGER, \
    charity INTEGER, \
    PRIMARY KEY (donor, charity) \
  );'

  db.query(sql, function(error, result) {
    if (error) {
      console.log("!!" + error);
    } else {
      console.log('Initialized following table.');
    }
  });

  sql = 'CREATE TABLE IF NOT EXISTS post ( \
    id INTEGER PRIMARY KEY AUTOINCREMENT, \
    donor INTEGER, \
    charity INTEGER, \
    body TEXT, \
    time INTEGER, \
    FOREIGN KEY(donor) REFERENCES donor(id), \
    FOREIGN KEY(charity) REFERENCES charity(id) \
  );';

  db.query(sql, function(error, result) {
    console.log('Initialized post table.');
      db.query('INSERT INTO post '
          + '(donor, charity, body, time) '
          + 'VALUES (?, ?, ?, ?)',
          [1, 1, 'Without doubt, DWB is a greatly deserving charity--I commend them for facing danger every day for the sake of those much less fortunate. Give!', 1492637449237],
          function(error, result) {
              console.log('sample post');
      });
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


  sql = 'CREATE TABLE IF NOT EXISTS user ( \
    id INTEGER PRIMARY KEY AUTOINCREMENT, \
    username TEXT, \
    password TEXT, \
    email TEXT \
  );'

  db.query(sql, function(error, result) {
    console.log('Initialized user table.');
      db.query('INSERT INTO user '
          + '(username, password, email) '
          + 'VALUES (?, ?, ?)',
          ['Doge', 'suchsecure', 'doggo@pupper.com'],
          function(error, result) {
              console.log('Insert Test User');
      });
  });



  // wait a second for things to finish then start the server
  setTimeout(callback, 1000);
}
