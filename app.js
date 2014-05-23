var express = require('express')
  , http = require('http')
  , stylus = require('stylus')
  , Twit = require('twit');


// Setup - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


var app = express();
var server = app.listen(3000);
var io = require('socket.io').listen(server); // this tells socket.io to use our express server
var stream_phrase = "bieber";
var twitterQuery_1 = "BarackObama";
var twitterQuery_2 = "MichelleObama";

// Setup stuff.
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  // NB: this must be before the static use call below, unless doesn't work... why?
  app.use(stylus.middleware(
    { src: __dirname + '/public'
    , compile: compile
    }
  ));
  app.use(express.static(__dirname + '/public'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});
function compile(str, path) {
  return stylus(str).set('filename', path)
}
app.configure('development', function(){
  app.use(express.errorHandler());
});

// Twitter credentials.
var T = new Twit({
    consumer_key: 'kEwsveRmFIRibVAIq43NAIjCt'
  , consumer_secret: 'VNgTmvWXyW7j8nJdIEQowmdhmutu3iB9Ee7WcgWzWSPjMNGJbF'
  , access_token: '40685218-xsWo4c9s23Tr6UEXQbE5VjUeWEH2hUpaKW0vOCBS0'
  , access_token_secret: '2nAecFy6Y9rRyUQflekTumONqYFzYSrGr4n1cgifareuQ'
})

// Web pages & routes - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Routes to the various pages.
app.get('/', function (req, res) {
    res.render('index.jade',
      {title: 'Twitter Machina - Prototype', twitterQuery_1_msg: twitterQuery_1, twitterQuery_2_msg: twitterQuery_2}
    );
});

//
console.log("Express server listening on port 3000");


// Twitter API usage - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


// Open a socket to stream results continuously to our webpage.
io.sockets.on('connection', function (socket) {
    console.log('A new user connected!');
    // socket.emit('info', { msg: 'The world is round, there is no up or down.' });       //DEV

    // Do REST search #1.
    T.get('statuses/user_timeline', { screen_name: twitterQuery_1, count: 10 }, function(err, data, response) {
        if (err) {
          console.log("ERROR- app.js- search #1.");
          console.error(err.stack);
        }
        socket.emit('eTwitterGetResult_1', data);
    });

    // Do REST search #2.
    T.get('statuses/user_timeline', { screen_name: twitterQuery_2, count: 10 }, function(err, data, response) {
        if (err) {
          console.log("ERROR- app.js- search #2.");
          console.error(err.stack);
        }
        socket.emit('eTwitterGetResult_2', data);
    });


    // --- STREAM OFF FOR NOW ---
    // // Everytime there's a new tweet, emit a event passing the tweet.
    // var stream = T.stream('statuses/filter', { track: stream_phrase });
    // stream.on('tweet', function (tweet) {
    //   socket.emit('twitter_stream', tweet);
    // });

});


// Extras - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


// Handle uncaughtException errors, to prevent app from crashing when one happens.
process.on('uncaughtException', function(err) {
  console.error("ERROR- uncaughtException- "+ err.stack);
});
