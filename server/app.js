// use strict compiling
"use strict";

var express = require('express');
var anyDB = require('any-db'); // TODO:
var bodyParser = require('body-parser');

var app = express();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var expressSession = require('express-session');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var genHash = require('sha256');
var upload = require('formidable-upload');
var fs = require('fs');

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

// Configure upload things
var uploader = upload()
  .accept(['image/png', 'image/gif', 'image/jpg', 'image/jpeg'])
  .to('img')

app.post('/uploadCover', uploader.middleware('imagefile'), function(req, res) {
  fs.readFile(req.files.imagefile._writeStream.path, function (err, data) {
    var time = new Date().getTime();
    time = time + "";
    var newFileName = createHash(time + req.files.imagefile.name);
    var newPath = __dirname + "/../img/" + newFileName;
    var sql = 'UPDATE donor SET cover_image = ? WHERE email = ?';
    var email = req.user.rows[0].email;
    var filename = newFileName + "";

    var sqldata = [filename, email];
    db.query(sql, sqldata, function(error, result) {
      if (error) {
        console.log(error);
      } else {
        console.log('Set cover_image of ' + email + ' to ' + filename);
      }
    });

    console.log(newPath);
    fs.writeFile(newPath, data, function (err) {
      console.log(err);
    });

  });

  res.redirect("/");
},
function(req, res) {
  onsole.log('/uplodCover request failed');
  res.redirect("/");
});

app.post('/uploadProfile', uploader.middleware('imagefile'), function(req, res) {
  fs.readFile(req.files.imagefile._writeStream.path, function (err, data) {
    var time = new Date().getTime();
    time = time + "";
    var newFileName = createHash(time + req.files.imagefile.name);
    var newPath = __dirname + "/../img/" + newFileName;
    var sql = 'UPDATE donor SET profile_image = ? WHERE email = ?';
    var email = req.user.rows[0].email;
    var filename = newFileName + "";

    var sqldata = [filename, email];
    db.query(sql, sqldata, function(error, result) {
      if (error) {
        console.log(error);
      } else {
        console.log('Set profile_image of ' + email + ' to ' + filename);
      }
    });

    console.log(newPath);
    fs.writeFile(newPath, data, function (err) {
      console.log(err);
    });

  });

  res.redirect("/");
},
function(req, res) {
  onsole.log('/uplodCover request failed');
  console.log(req);
  res.redirect("/");
})


// create a post for a given donor // TODO: security, cookies, auth
app.post('/post', function(request, response) {
  console.log('- Request received /post');
  
  const donor = request.body.donor;
  const charity = request.body.charity;
  const body = request.body.body;
  const time = new Date().getTime();

  console.log([donor, charity, body, time]);

  let sql = 'INSERT INTO post (donor, charity, body, time) VALUES '
          + '(?, ?, ?, ?)';
  db.query(sql, [donor, charity, body, time], function(error, result) {
    const id = result.lastInsertId;

    // TODO: error handling and security and auth and xss and csrf
    sql = 'SELECT name, profile_image FROM donor WHERE id = ?';
    db.query(sql, [donor], function(error, result) {
      if (error) { // todo: not this
        console.log('post failed with: ' + error);
        response.json({error: error});
      } else {
        response.json({
          id: id,
          name: result.rows[0].name,
          profile_image: result.rows[0].profile_image,
          donor: donor,
          body: body,
          time: time,
        });
      }
    });
  });
});

// retrieve charities' and donors' name for search
app.get('/searchDataShorted', function(request, response) {
    console.log('- Request received /searchData:');
    var sql = 'SELECT d.name AS name, d.id AS id, \'D\' AS category FROM donor AS d WHERE d.name LIKE ?' +
        'UNION SELECT c.name AS name, c.id AS id, \'C\' AS category FROM charity AS c WHERE c.name LIKE ?' +
        'LIMIT 5';
    // console.log(sql)
    db.query(sql, ['%'+request.query.keyWord+'%', '%'+request.query.keyWord+'%'],function(error, result) {
        if (error) {
            console.log("Search error: "+error)
            response.json([]);
        } else {
            // console.log(result);
            response.json(result.rows);
        }
    });
});

// retrieve charities' and donors' name for search
app.get('/searchData', function(request, response) {
    console.log('- Request received /searchData:');
    var sql = 'SELECT d.name AS name, d.id AS id, d.profile_image AS profile, \'D\' AS category FROM donor AS d WHERE d.name LIKE ?' +
        'UNION SELECT c.name AS name, c.id AS id, c.profile_image AS profile, \'C\' AS category FROM charity AS c WHERE c.name LIKE ?';
    // console.log(sql)
    db.query(sql, ['%'+request.query.keyWord+'%', '%'+request.query.keyWord+'%'],function(error, result) {
        if (error) {
            console.log("Search error: "+error)
            response.json([]);
        } else {
            response.json(result.rows);
        }
    });
});

// check whether a user has followed a certain user or charity
app.get('/checkFollow', isLoggedIn, function(request, response) {
    //console.log('- Request received /checkFollow:');
    var sql = 'SELECT donor, charity FROM following WHERE donor = ? AND charity = ?';
    db.query(sql, [request.query.user,request.query.charity],function(error, result) {
        if (error) {
            console.log("Check follow error: "+error)
            response.json([]);
        } else {
            if(result.rows.length === 0) {
                response.json('false');
            } else {
                response.json('true');
            }
        }
    });
});

app.get('/checkConnect', isLoggedIn, function(request, response) {
    //console.log('- Request received /checkFollow:');
    var sql = 'SELECT user, donor FROM connection WHERE user = ? AND donor = ?';
    db.query(sql, [request.query.user,request.query.donor],function(error, result) {
        if (error) {
            console.log("Check follow error: "+error)
            response.json([]);
        } else {
            if(result.rows.length === 0) {
                response.json('false');
            } else {
                response.json('true');
            }
        }
    });
});

// retrieve the posts for feed on homepage
app.get('/homeposts', isLoggedIn, function(request, response) {
  console.log('- Request received /homeposts:');

  const User = request.query.user; //ToDo:security check
  console.log("User id: "+User);
  let sql = 'SELECT d.id AS donor, d.name, d.profile_image, p.id, p.body, p.time '
    + 'FROM post AS p JOIN donor AS d '
    + 'ON p.donor = d.id WHERE p.donor = ? OR p.donor '
    + 'IN (SELECT donor FROM connection WHERE '
    + 'user = ?) OR p.charity IN (SELECT charity FROM '
    + 'following WHERE donor = ?) ORDER BY time DESC';
  db.query(sql, [User,User,User], function(error, result) {
      if(result !== undefined) {
          if (!result.rowCount) { // TODO: errors, which posts, sorting
              // todo errors, also auth
              response.json([]);
          } else {
              // return the requested posts
              response.json(result.rows);
          }
      }
  });
});

// retrieve the posts for feed on donorpage
app.get('/donorposts', isLoggedIn, function(request, response) {
    console.log('- Request received /donorposts:');

    const Donor = request.query.donor; //ToDo:security check
     console.log("Donor id: "+Donor);
    let sql = 'SELECT d.id AS donor, d.name, d.profile_image, p.id, p.body, p.time '
        + 'FROM post AS p JOIN donor AS d '
        + 'ON p.donor = d.id WHERE p.donor = ? ORDER BY time DESC';
    db.query(sql, [Donor], function(error, result) {
        if(result !== undefined) {
            if (!result.rowCount) { // TODO: errors, which posts, sorting
                // todo errors, also auth
                response.json([]);
            } else {
                // return the requested posts
                response.json(result.rows);
            }
        }
    });
});

// retrieve the posts for feed on charitypage
app.get('/charityposts', isLoggedIn, function(request, response) {
    console.log('- Request received /charityposts:');

    const Charity = request.query.charity; //ToDo:security check

    let sql = 'SELECT d.id AS donor, d.name, d.profile_image, p.id, p.body, p.time '
        + 'FROM post AS p JOIN donor AS d '
        + 'ON p.donor = d.id WHERE p.charity = ? ORDER BY time DESC';
    db.query(sql, [Charity], function(error, result) {
        if(result !== undefined) {
            if (!result.rowCount) { // TODO: errors, which posts, sorting
                // todo errors, also auth
                response.json([]);
            } else {
                // return the requested posts
                response.json(result.rows);
            }
        }
    });
});

// retrieve the data for a donor
app.get('/donor/:id/data', function(request, response) {
  console.log('- Request received /donor/:id:/data');

  const requester = 'todo';
  const donor = request.params.id;
  var sql = 'SELECT d.name, d.description, d.profile_image, d.cover_image '
    + 'FROM donor AS d '
    + 'WHERE d.id = ?';
  db.query(sql, [donor], function(error, result) {
      if(result !== undefined) {
        if (!result.rowCount === 1) { // TODO: errors, which posts, sorting
          // todo errors, also auth
          response.json([]);
        } else {
          // return the requested donor information
          response.json(result.rows[0]);
        }
      } else{
         console.log("fetch donor profile failed!")
      }
  });
});

// retrieve the stats for a donor
app.get('/donor/:id/stats', function(request, response) {
  console.log('- Request received /donor/:id:/stats');

  const requester = 'todo';
  const donor = request.params.id;

  var sql = 'SELECT c.category, SUM(d.amount) AS amount '
      + 'FROM donation AS d JOIN charity AS c ON d.charity = c.id '
      + 'WHERE d.donor = ? GROUP BY c.category ORDER BY c.category;';
  db.query(sql, [donor], function(error, result) {
    if(result !== undefined) {
      if (!result.rowCount) { // TODO: errors, which posts, sorting
        // todo errors, also auth
        response.json({
          labels: [],
          data: [],
        });
      } else {
        // return the requested donation information
        const labels = result.rows.map((row) => row.category);
        const data = result.rows.map((row) => row.amount);

        response.json({
          labels: labels,
          data: data,
        });
      }
    } else {
      console.log("fetch donor stats failed!");
      response.json({
        labels: [],
        data: [],
      });
    }
  });
});

// record a donation // TODO: security, cookies, auth
app.post('/donate', function(request, response) {
  console.log('- Request received /donate');
  
  const donor = request.body.donor;
  const charity = request.body.charity;
  const isPublic = request.body.isPublic; // todo this should be in charity
  const amount = request.body.amount; // todo non negative
  const time = new Date().getTime();

  var sql = 'INSERT INTO donation (donor, charity, amount, time, isPublic) \
            VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [donor, charity, amount, time, isPublic], function(error, result) {
    const id = result.lastInsertId; // todo unused
    // response.sendStatus(200);
    // TODO: error handling and security and auth and xss and csrf
    sql = 'SELECT name FROM charity WHERE id = ?';
    db.query(sql, [charity], function(error, result) {
      if (isPublic) {
        response.json({
          name: result.rows[0].name,
          amount: amount,
          time: time,
        });
      } else {
        response.sendStatus(200);
      }
    });
  });
});

// retrieve the donations for TODO
app.get('/donations/:id', function(request, response) {
  console.log('- Request received /donations/:id:');

  const requester = 'todo';
  const donor = request.params.id;
  const charity = 'todo ';

  var sql = 'SELECT c.name, d.id, d.amount, d.time, c.category '
    + 'FROM donation AS d JOIN charity AS c '
    + 'ON d.charity = c.id WHERE d.donor = ? AND d.isPublic = \'true\' '
    + 'ORDER BY time DESC;';
  db.query(sql, [donor], function(error, result) {
      if(result !== undefined) {
        if (!result.rowCount) { // TODO: errors, which posts, sorting
          // todo errors, also auth
          response.json([]);
        } else {
          // return the requested posts
          console.log('found donations ' + result.rows);
          response.json(result.rows);
        }
      } else {
        console.log('error in donations: ');
        console.log(error);
        response.json([]);
      }
  });
});

// retrieve data about a charity
app.get('/charity/:id/data', function(request,response) {
  console.log('- Request received /charity/:id/data:');

  const id = request.params.id;

  let sql = 'SELECT name, website, description, cover_image '
          + 'FROM charity WHERE id = ?;';
  db.query(sql, [id], function(error, result) {
    if (!result.rowCount == 1) { // TODO: errors, which posts, sorting
      // todo errors, also auth
    } else {
      response.json(result.rows[0]);
    }
  });
});

app.get('/suggestDonor',function(request,response){
    let sql= 'SELECT id, name, description, profile_image FROM donor' // TODO: not good security
        + ' WHERE id != ? ORDER BY id ASC';
    db.query(sql, [request.query.donor], function(error, result) {

        if (!result.rowCount) { // TODO: errors, which posts, sorting
            // todo errors, also auth
            console.log(error);
        } else {
            response.json(result.rows);
        }
    });
});

app.get('/suggestCharity',function(request,response){
    let sql= 'SELECT id, name, description, profile_image FROM charity' // TODO: not good security
        + ' WHERE id NOT IN (SELECT charity from following WHERE donor=?) ORDER BY id ASC';
    db.query(sql, [request.query.id], function(error, result) {
        if(error){
            console.log("Fetch suggestion error: "+error);
        }
        else if (!result.rowCount) { // TODO: errors, which posts, sorting
            // todo errors, also auth
        } else {
            response.json(result.rows);
        }
    });
});

app.post('/follow', function(request, response) {
  console.log('- Request received /follow');
  
  const donor = request.body.user;
  const charity = request.body.charity;

  let sql = 'INSERT INTO following (donor, charity) \
            VALUES (?, ?)';
  db.query(sql, [donor, charity], function(error, result) {
    if (error) {
      console.log(error);
      response.json([]);
    } else {
      console.log("(donor " + donor + ", charity " + charity + ") was added successfully");
      response.json([]);
    }
  });
});

app.post('/connect', function(request, response) {
    console.log('- Request received /connect');

    const user = request.body.user;
    const donor = request.body.donor;

    let sql = 'INSERT INTO connection (user, donor) \
            VALUES (?, ?)';
    db.query(sql, [user, donor], function(error, result) {
        if (error) {
            console.log(error);
            response.json([]);
        } else {
            console.log("(user " + user + ", donor " + donor + ") was added successfully");
            response.json([]);
        }
    });
});

app.post('/unfollow', function(request, response) {
    console.log('- Request received /unfollow');

    const donor = request.body.user;
    const charity = request.body.charity;

    let sql = 'DELETE FROM following WHERE donor = ? AND charity = ?';
    db.query(sql, [donor, charity], function(error, result) {
        if (error) {
            console.log(error);
            response.json([]);
        } else {
            console.log("(donor " + donor + ", charity " + charity + ") was deleted successfully");
            response.json([]);
        }
    });
});

app.post('/unconnect', function(request, response) {
    console.log('- Request received /unconnect');

    const user = request.body.user;
    const donor = request.body.donor;

    let sql = 'DELETE FROM connection WHERE user = ? AND donor = ?';
    db.query(sql, [user, donor], function(error, result) {
        if (error) {
            console.log(error);
            response.json([]);
        } else {
            console.log("(user " + user + ", donor " + donor + ") was deleted successfully");
            response.json([]);
        }
    });
});

app.post('/editProfile', function(request, response) {
  console.log('- Request received /editProfile');
  console.log(request.body);
  const donor = request.body.donor;
  const name = request.body.name;
  const description = request.body.description;

  let sql = 'UPDATE donor SET name = ?, description = ? WHERE id = ?';
  db.query(sql, [name, description, donor], function(error, result) {
    if (error) {
      console.log(error);
      response.json([]);
    } else {
      console.log("donor " + donor + " updated their name to " + name + " and description to " + description);
      response.json([]);
    }
  });
});

app.post('/addCharity', isLoggedIn, function(req, res) {
  console.log('request received to add charity');
  if (req.user.rows[0].email === "admin@outercircle.com") {
    let sql = 'INSERT INTO charity '
            + '(name, website, description, cover_image, profile_image, category) '
            + 'VALUES (?, ?, ?, ?, ?, ?)';
    var name = req.body.name;
    var website = req.body.website;
    var description = req.body.description;
    var category = req.body.category;
    db.query(sql,
            [name, website, description, 'beach.jpg','profile2.jpg', category],
            function(error, result) {
                console.log('added charity ' + name);
                res.send({added: 'success'});
        });
  }
  else {
    console.log("request denied");
    res.status(401);
    res.send({isAuth: "unauthorized"});
  }
});

// serve the home page on any other request // TODO: this is sketchy
app.get('*', function(request, response) {
  // console.log('- Request received *:');
  response.sendFile('index.html', {root : 'dist'}); // TODO: again here
});

// initialize the database the web server
init(function() {
  app.listen(8080, function(){
    console.log('- Server listening on port 8081');
  });
})
// Alright now lets handle login with a LocalStrategy
passport.use('login', new LocalStrategy({
	passReqToCallback: true
}, function(req, username, password, done) {
		// Check if user exists in database
		var sql = 'SELECT * FROM donor WHERE email = ?';
    console.log("SQL request: "+ username);
    console.log("Pass: " + password);
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
			if (!isValidPassword(password, passwd)) {
				console.log("Invalid Password");
				return done(null, false, req.flash('message', 'Invalid Password'));
			}
			// User and password match, return user from done method
			console.log("Successful Login");
			return done(null, user);
		}); 

	}
));

app.post('/signup', function(request, response) {
  var username = request.body.username;
  var password = request.body.password;
  var firstname = request.body.firstname;
  var lastname = request.body.lastname;
  var sql = 'SELECT * FROM donor WHERE email = ?';
  db.query(sql, [username], function(err, result) {
    // If there is an error, return using done method
    if (err) {
      console.log(err);
      return done(err);
    }
    // User doesn't exist so can continue with signup
    if (result.rows.length === 0) {
      var passwd = createHash(password);
      sql = 'INSERT INTO donor (email, name, password, description, profile_image, cover_image) VALUES (?, ?, ?, ?, ?, ?)';
      db.query(sql,
          [username, firstname + " " + lastname, passwd, "Update profile to give a donor description", "default_profile.jpg", "beach.jpg"],
          function(error, result) {
            console.log('Inserted donor: ' + username + ", With password hash: " + passwd);
            console.log('Name: ' + firstname + " " + lastname);
            response.send({signup: "success"});
          });
    }

    // User exists so need to let user know
    else {
      response.send({signup: "failure"});
      console.log('username is already defined');
    }
  });
});
// This is what we will use to compare hashes
function isValidPassword(input, password) {
  console.log("input: " + createHash(input));
  console.log("password: " + password);
	return (password === createHash(input))
}

// Generates hash using SHA-256
var createHash = function(password){
 return genHash(password);
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
    res.status(401);
    res.send({isAuth: "unauthorized"});
  });


passport.serializeUser(function (user, done) {
    console.log('serializing user:', user);
    done(null, user.id);
});

passport.deserializeUser(function (userID, done) {
    // console.log('deserializing user with ID:', userID);
    var sql = 'SELECT * FROM donor WHERE id = ?';
    db.query(sql, [userID], function(err, user) {
      done(err, user);
    });
});

app.post('/loggedIn', isLoggedIn, function (req, res) {
    res.send({isAuth: "authorized",userId:req.user.rows[0].id});
  }, function (err, req, res, next) {
    res.status(401);
    res.send({isAuth: "unauthorized"});
  });

app.post('/loggedInAdmin', isLoggedIn, function (req, res) {
    if (req.user.rows[0].email === "admin@outercircle.com") {
      res.send({isAuth: "authorized"});
    }
    else {
      res.status(401);
      res.send({isAuth: "unauthorized"});
    }
  }, function (err, req, res, next) {
    res.status(401);
    res.send({isAuth: "unauthorized"});
  });

app.post('/logout', isLoggedIn, function(req, res) {
  req.logout();
  res.redirect('/');
});

// initialize the database
function init(callback) {
  console.log('Initializing database...');

  let sql = 'CREATE TABLE IF NOT EXISTS donor ( \
    id INTEGER PRIMARY KEY AUTOINCREMENT, \
    email TEXT, \
    name TEXT, \
    password TEXT, \
    description TEXT, \
    profile_image TEXT, \
    cover_image TEXT \
  );';

    db.query(sql, function(error, result) {
        if (error) {
            console.log("!!" + error);
        } else {
            console.log('Initialized donor table.');
            var sql2 = 'SELECT COUNT(id) AS count FROM donor';
            db.query(sql2, function(error, result) {
                if(result === undefined || result.rows[0].count == 0 || result.rows[0].count == 1) {
                    db.query(' INSERT INTO donor '
                        + '(name, email, password, description, profile_image, cover_image) '
                        + 'VALUES (?, ?, ?, ?, ?, ?),'
                        + '(?, ?, ?, ?, ?, ?), '
                        + '(?, ?, ?, ?, ?, ?), '
                        + '(?, ?, ?, ?, ?, ?), '
                        + '(?, ?, ?, ?, ?, ?) ',
                        [
                            'Ian Stewart', 'ian_stewart@brown.edu', 'pass1',
                            'Philanthropy plays a strong role in solving some of the world’s biggest health and development challenges. Generosity is part of what makes us human, and nearly all cultures have strong traditions of giving and caring for their communities. We aim to increase the quantity and quality of generosity by all people—from high net worth individuals to everyday givers.', 'profileI.jpg', 'beach.jpg',
                            'David Branse', 'david_branse@brown.edu', 'pass2',
                            'If we can teach people about wildlife, they will be touched. Share my wildlife with me. Because humans want to save things that they love.', 'profileD.jpg', 'whale.jpg',
                            'Shingo Lavine', 'shingo_lavine@brown.edu', 'pass3',
                            'I tried to discover, in the rumor of forests and waves, words that other men could not hear, and I pricked up my ears to listen to the revelation of their harmony', 'profileS.jpg', 'forest.jpg',
                            'Zhengwei Liu', 'zhengwei_liu@brown.edu', 'pass4',
                            'A dog will teach you unconditional love. If you can have that in your life, things won\'t be too bad.', 'profileZ.jpg', 'dogs.jpg',
                            'Xuenan Li', 'xuenan_li@brown.edu', 'pass5',
                            'There is a natural law, a Divine law, that obliges you and me to relieve the suffering, the distressed and the destitute.', 'profileX.jpg', 'charity.jpg'
                        ],
                        function(error, result) {
                            console.log('sample donor');
                        });
                }
            });
        }
    });


  sql = 'CREATE TABLE IF NOT EXISTS charity ( \
    id INTEGER PRIMARY KEY AUTOINCREMENT, \
    name TEXT, \
    website TEXT, \
    description TEXT, \
    cover_image TEXT, \
    profile_image TEXT, \
    category TEXT \
  );';

    db.query(sql, function(error, result) {
        if (error) {
            console.log("!!" + error);
        } else {
            console.log('Initialized charity table.');
            var sql2 = 'SELECT COUNT(id) AS count FROM charity';
            db.query(sql2, function(error, result) {
                if(result === undefined || result.rows[0].count == 0) {
                    console.log('Initialized charity table.');
                    db.query('INSERT INTO charity '
                        + '(name, website, description, cover_image, profile_image, category) '
                        + 'VALUES (?, ?, ?, ?, ?, ?),  (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?)',
                        [
                            'Doctors Without Borders, USA', 'http://www.doctorswithoutborders.org/', 'Doctors Without Borders, USA (DWB-USA) was founded in 1990 in New York City to raise funds, create awareness, recruit field staff, and advocate with the United Nations and US government on humanitarian concerns. Doctors Without Borders/Médecins Sans Frontières (MSF) is an international medical humanitarian organization that provides aid in nearly 60 countries to people whose survival is threatened by violence, neglect, or catastrophe, primarily due to armed conflict, epidemics, malnutrition, exclusion from health care, or natural disasters.',
                            'beach.jpg','charityD.jpg', 'Health',
                            'World Wildlife Fund', 'https://www.worldwildlife.org/', 'The world’s leading conservation organization, WWF works in 100 countries and is supported by more than one million members in the United States and close to five million globally. WWF\'s unique way of working combines global reach with a foundation in science, involves action at every level from local to global, and ensures the delivery of innovative solutions that meet the needs of both people and nature.',
                            'beach.jpg','charityW.jpg', 'Environment',
                            'American Civil Liberties Union Foundation', 'https://www.aclu.org/', 'For almost 100 years, the ACLU has worked to defend and preserve the individual rights and liberties guaranteed by the Constitution and laws of the United States.',
                            'beach.jpg','charityL.jpg', 'Human',
                            'Step Up For Students', 'https://www.stepupforstudents.org/', 'Step Up For Students empowers parents to pursue and engage in the most appropriate learning options for their children, with an emphasis on families who lack the financial resources to access these options. By pursuing this mission, we help public education fulfill the promise of equal opportunity.',
                            'beach.jpg','charityS.jpg', 'Education'
                        ],
                        function(error, result) {
                            if (error) {
                                console.log('error in sample charity: ' + error);
                            } else {
                                console.log('sample charity');
                            }
                        });
                }
            });
        }
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

    sql = 'CREATE TABLE IF NOT EXISTS connection ( \
    user INTEGER, \
    donor INTEGER, \
    PRIMARY KEY (user, donor) \
  );'

    db.query(sql, function(error, result) {
        if (error) {
            console.log("!!" + error);
        } else {
            console.log('Initialized connection table.');
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
      if (error) {
          console.log("!!" + error);
      } else {
          console.log('Initialized post table.');
          var sql2 = 'SELECT COUNT(id) AS count FROM post';
          db.query(sql2, function(error, result) {
              if(result === undefined || result.rows[0].count == 0) {
                  db.query('INSERT INTO post '
                      + '(donor, charity, body, time) '
                      + 'VALUES (?, ?, ?, ?) ',
                      [1, 1, 'Without doubt, DWB is a greatly deserving charity--I commend them for facing danger every day for the sake of those much less fortunate. Give!', 1492637449237],
                      function(error, result) {
                          console.log('sample post');
                      });
              }
          });
      }
  });

  sql = 'CREATE TABLE IF NOT EXISTS donation ( \
    id INTEGER PRIMARY KEY AUTOINCREMENT, \
    donor INTEGER, \
    charity INTEGER, \
    amount INTEGER, \
    time INTEGER, \
    isPublic BOOLEAN, \
    FOREIGN KEY(donor) REFERENCES donor(id), \
    FOREIGN KEY(charity) REFERENCES charity(id) \
  );'

  db.query(sql, function(error, result) {
    console.log('Initialized donation table.');
  });

  // wait a few seconds for things to finish then start the server
  setTimeout(callback, 3000);
}
