var express = require('express')
  , http = require('http')
  , stylus = require('stylus')
  , Twit = require('twit'),
  Paper = require('paper');

// 
var app = express();
var server = app.listen(4000);
var io = require('socket.io').listen(server); // this tells socket.io to use our express server
var stream_phrase = "bieber";
var search_phrase = "doorknob butter";

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
console.log("Express server listening on port 4000");

// Open a socket to stream results continuously to our webpage.
io.sockets.on('connection', function (socket) {
    console.log('A new user connected!');
    // socket.emit('info', { msg: 'The world is round, there is no up or down.' });

    // Everytime there's a new tweet, emit a event passing the tweet.
    var stream = T.stream('statuses/filter', { track: stream_phrase });
    stream.on('tweet', function (tweet) {
      socket.emit('twitter_stream', tweet);
    });

    //
    T.get('search/tweets', { q: "doorknob butter", count: 1 }, function(err, data, response) {
        data = JSON.stringify(data, null, 4);
        socket.emit('twitter_search', data);
    });
});

// Twitter credentials.
// Replace these with your own!

console.log("Using Alex's keys");
//Alex's keys
var T = new Twit({
    consumer_key: 'P8EYI0gloJoDTOu8596QcUn1c'
  , consumer_secret: 'Ya8PmkQxm7FLdQ6coftOi65hSedUNevFVil0kApw45YEI22mMd'
  , access_token: '234878749-OlktDQaRgvr6hkBoQ4kI94y7sxI1EfpOlH17rwTG'
  , access_token_secret: 'nKpgBcCd20RFXeASCLwACtA80PnEmvBJ6kJcaeA4oSO4a'
})