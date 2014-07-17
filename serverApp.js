var express = require('express')
  , http = require('http')
  , app = express()
  , server = http.createServer(app)
  , path = require("path")
  , passport = require('passport')
  , TwitterStrategy = require('passport-twitter').Strategy
  , ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn
  , io = require('socket.io').listen(server)    // this tells socket.io to use our express server
  , Twit = require('twit')
  , _ = require('underscore');

// Our Twitter app's consumer keys, from https://dev.twitter.com/
var TWITTER_CONSUMER_KEY = "lG3ef2gaY5yeX0kVj7W3DFDG3"
  , TWITTER_CONSUMER_SECRET = "HNcGrpUvd9mIAaE6qHhYfupdS49IEZ5Vgl7TwVYVtHCYq0dd2D";

// Setup for Passport/Twitter authentication.
app.use(express.static(__dirname + '/public'));
app.use(express.cookieParser());
app.use(express.session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, done) {
  done(null, user);
});
 passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
// Other general setup.
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));      // DEV: necessary? we have a static path above...

// Secondary setup for Passport/Twitter authentication.
passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    
    // Use user credentials for accessing Twitter API.
    createTwitObject(token, tokenSecret);
    // Send user profile info to success route (ie. app.ejs).
    var user = profile;
    // console.log("Twitter user logged in ----------");
    // console.log("username : "+ user.username);
    // console.log("displayName : "+ user.displayName);
    // console.log("id : "+ user.id);
    return done(null, user);
  }
));

// App page routes.
app.get('/', function (req, res) {
    res.render('splash.ejs');
});
app.get('/app', ensureLoggedIn('/'), function (req, res) {
    // console.log('* * * * * *');
    // console.log(req.user);

    res.render('app.ejs', {
      title: 'Sosolimited - Common Ground',
      user : req.user // get the user out of session and pass to template
    });
});
// Twitter auth-specific routes.
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', { successReturnToOrRedirect: '/app', failureRedirect: '/' }));

// Start Server.
server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

// DEV: necessary?
// Handle uncaughtException errors, to prevent app from crashing when one happens.
process.on('uncaughtException', function(err) {
  console.error("ERROR- uncaughtException- "+ err.stack);
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Twitter API usage
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


var T;                          // Twitter API request object.
var numberOfQueries = 20;

// Takes logged-in user's access tokens to access the Twitter API.
function createTwitObject(token, tokenSecret){
  console.log("createTwitObject - - - ENTER");
  console.log("token : "+ token);
  console.log("tokenSecret : "+ tokenSecret);

  T = new Twit({
      consumer_key: TWITTER_CONSUMER_KEY
    , consumer_secret: TWITTER_CONSUMER_SECRET
    , access_token: token
    , access_token_secret: tokenSecret
  });

  // DEV: JC's keys.
  // T = new Twit({
  //     consumer_key: 'kEwsveRmFIRibVAIq43NAIjCt'
  //   , consumer_secret: 'VNgTmvWXyW7j8nJdIEQowmdhmutu3iB9Ee7WcgWzWSPjMNGJbF'
  //   , access_token: '40685218-xsWo4c9s23Tr6UEXQbE5VjUeWEH2hUpaKW0vOCBS0'
  //   , access_token_secret: '2nAecFy6Y9rRyUQflekTumONqYFzYSrGr4n1cgifareuQ'
  // });

  // DEV: Alex's keys.
  // var T = new Twit({
  //    consumer_key: 'P8EYI0gloJoDTOu8596QcUn1c'
  //  , consumer_secret: 'Ya8PmkQxm7FLdQ6coftOi65hSedUNevFVil0kApw45YEI22mMd'
  //  , access_token: '234878749-OlktDQaRgvr6hkBoQ4kI94y7sxI1EfpOlH17rwTG'
  //  , access_token_secret: 'nKpgBcCd20RFXeASCLwACtA80PnEmvBJ6kJcaeA4oSO4a'
  // });
}

// Open a socket to stream results continuously to our webpage.
io.sockets.on('connection', function (socket) {
  console.log('A new user connected!');
  // socket.emit('info', { msg: 'The world is round, there is no up or down.' });       //OLD

  socket.on('eClientRequestsTwitterQuery', function (comparisonId, item1, item2) {
    console.log("serverApp.js- eClientRequestsTwitterQuery- ENTER- item1: "+ item1 +" | item2: "+ item2);
    sendQueries(socket, comparisonId, item1, item2);
  });

});

// Sends 2 queries to Twitter for a Comparison object.
function sendQueries(socket, comparisonId, item1, item2) {
  console.log("serverApp.js- sendQueries- ENTER- comparisonId = "+ comparisonId +" | item1 = "+ item1 +" | item2 = "+ item2);

  // Search tweets from twitter user #1's timeline.
  function getQueries(iQ) {
    T.get('statuses/user_timeline', { screen_name: item1, exclude_replies: true, include_rts: false, count: iQ }, function(err, data, response) {
      if (err) {
        console.log("ERROR- serverApp.js- search #1.");
        console.error(err.stack);
      } else if (data.length >= numberOfQueries) {
            var dataSet1 = data.slice(0, numberOfQueries+1);
            socket.emit('eServerReturnsTwitterResult_'+ comparisonId, {iData: dataSet1, iQueryNum: 1, iQueryString: item1});
        } else {
            var curSearch1 = iQ + numberOfQueries;
            if (curSearch1 > numberOfQueries*1) { // Multiply for more
              var dataSet1 = data.slice(0, numberOfQueries+1);
              socket.emit('eServerReturnsTwitterResult_'+ comparisonId, {iData: dataSet1, iQueryNum: 1, iQueryString: item1});
            } else {
              getQueries(curSearch1);
            }
        }
      }
      
    );
  };
  getQueries(numberOfQueries);

  // Ger twitter user #1's image url.
  T.get('users/show/:screen_name', { screen_name: item1 }, function (err, data, response) {
    console.log("USER IMAGE: ")
    console.log(data.profile_image_url)
    socket.emit('eServerReturnsUserImage_'+ comparisonId, {iImageUrl: data.profile_image_url, iQueryNum: 1});
  })


  // Search tweets from twitter user #2's timeline.
  function getQueries2(iQ) {
    T.get('statuses/user_timeline', { screen_name: item2, exclude_replies: true, include_rts: false, count: iQ }, function(err, data, response) {
      if (err) {
        console.log("ERROR- serverApp.js- search #2.");
        console.error(err.stack);
      } else if (data.length >= numberOfQueries) {
            var dataSet2 = data.slice(0, numberOfQueries+1);
            socket.emit('eServerReturnsTwitterResult_'+ comparisonId, {iData: dataSet2, iQueryNum: 2, iQueryString: item2});
        } else {
            var curSearch2 = iQ + numberOfQueries;
            if (curSearch2 > numberOfQueries*1) { // Multiply for more
              var dataSet2 = data.slice(0, numberOfQueries+1);
              socket.emit('eServerReturnsTwitterResult_'+ comparisonId, {iData: dataSet2, iQueryNum: 2, iQueryString: item2});
            } else {
              getQueries2(curSearch2);
            }
        }
      }
      
    );
  };
  getQueries2(numberOfQueries);
  
  // Ger twitter user #2's image url.
  T.get('users/show/:screen_name', { screen_name: item2 }, function (err, data, response) {
    console.log("USER IMAGE: ")
    console.log(data.profile_image_url)
    socket.emit('eServerReturnsUserImage_'+ comparisonId, {iImageUrl: data.profile_image_url, iQueryNum: 2});
  })
}


