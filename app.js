var express = require('express')
  , http = require('http')
  , stylus = require('stylus')
  , Twit = require('twit');

var app = express();
var server = app.listen(3000);
var io = require('socket.io').listen(server); // this tells socket.io to use our express server

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.static(__dirname + '/public'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(stylus.middleware(
    { src: __dirname + '/public'
    , compile: compile
    }
  ));
});
function compile(str, path) {
  return stylus(str).set('filename', path)
}

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function (req, res) {
    res.render('layout.jade');
});

console.log("Express server listening on port 3000");

io.sockets.on('connection', function (socket) {
    console.log('A new user connected!');
    // socket.emit('info', { msg: 'The world is round, there is no up or down.' });

    var stream = T.stream('statuses/filter', { track: "obama" });
    stream.on('tweet', function (tweet) {
        socket.emit('twitter', tweet);
    });
});

var T = new Twit({
    consumer_key: 'kEwsveRmFIRibVAIq43NAIjCt'
  , consumer_secret: 'VNgTmvWXyW7j8nJdIEQowmdhmutu3iB9Ee7WcgWzWSPjMNGJbF'
  , access_token: '40685218-xsWo4c9s23Tr6UEXQbE5VjUeWEH2hUpaKW0vOCBS0'
  , access_token_secret: '2nAecFy6Y9rRyUQflekTumONqYFzYSrGr4n1cgifareuQ'
})