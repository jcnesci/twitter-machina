var express = require('express')
  , http = require('http')
  , stylus = require('stylus')
  , Twit = require('twit');

// 
var app = express();
var server = app.listen(3000);
var io = require('socket.io').listen(server); // this tells socket.io to use our express server
var stream_phrase = "bieber";
var search_phrase = "obama";

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

// Routes to the various pages.
app.get('/', function (req, res) {
    res.render('index.jade',
      {title: 'Twitter Stream - ' + stream_phrase, twitter_search_phrase: search_phrase, twitter_stream_phrase: stream_phrase}
    );
});

//
console.log("Express server listening on port 3000");

// Open a socket to stream results continuously to our webpage.
io.sockets.on('connection', function (socket) {
    console.log('A new user connected!');
    // socket.emit('info', { msg: 'The world is round, there is no up or down.' });

    // --- STREAM OFF FOR NOW ---
    // // Everytime there's a new tweet, emit a event passing the tweet.
    // var stream = T.stream('statuses/filter', { track: stream_phrase });
    // stream.on('tweet', function (tweet) {
    //   socket.emit('twitter_stream', tweet);
    // });

    //
    T.get('statuses/user_timeline', { screen_name: "BarackObama", count: 1 }, function(err, data, response) {
        if (err) {
          console.log("ERROR- app.js- T.get()");
          console.error(err.stack);
        }
        // data = JSON.stringify(data, null, 4);
        socket.emit('twitter_search', data);
    });
});

// Twitter credentials.
var T = new Twit({
    consumer_key: 'kEwsveRmFIRibVAIq43NAIjCt'
  , consumer_secret: 'VNgTmvWXyW7j8nJdIEQowmdhmutu3iB9Ee7WcgWzWSPjMNGJbF'
  , access_token: '40685218-xsWo4c9s23Tr6UEXQbE5VjUeWEH2hUpaKW0vOCBS0'
  , access_token_secret: '2nAecFy6Y9rRyUQflekTumONqYFzYSrGr4n1cgifareuQ'
})


// Extras - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


// Handle uncaughtException errors, to prevent app from crashing when one happens.
process.on('uncaughtException', function(err) {
  console.error("ERROR- uncaughtException- "+ err.stack);
});
