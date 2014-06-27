var express = require('express')
	, http = require('http')
	, stylus = require('stylus')
	, Twit = require('twit')
	, _ = require('underscore');

// Setup - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var app = express();
var server = app.listen(3000);
var io = require('socket.io').listen(server); // this tells socket.io to use our express server
var stream_phrase = "bieber";
var twitterQueries = [["BarackObama", "MichelleObama"],["WholeFoods","McDonalds"]];
var twitterQuery_1 = "BarackObama";
var twitterQuery_2 = "MichelleObama";
var numberOfQueries = 20;
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
	// socket.emit('info', { msg: 'The world is round, there is no up or down.' });       //OLD

	socket.on('eClientRequestsTwitterQuery', function (comparisonId, item1, item2) {
		console.log("serverApp.js- eClientRequestsTwitterQuery- ENTER- item1: "+ item1 +" | item2: "+ item2);
		sendQueries(socket, comparisonId, item1, item2);
	});

});

// Sends 2 queries to Twitter for a Comparison object.
function sendQueries(socket, comparisonId, item1, item2) {
	console.log("serverApp.js- sendQueries- ENTER- comparisonId = "+ comparisonId +" | item1 = "+ item1 +" | item2 = "+ item2);

	// Do REST search #1.
	T.get('statuses/user_timeline', { screen_name: item1, exclude_replies: true, include_rts: false, count: numberOfQueries }, function(err, data, response) {
			if (err) {
				console.log("ERROR- serverApp.js- search #1.");
				console.error(err.stack);
			}
			socket.emit('eServerReturnsTwitterResult_'+ comparisonId, {iData: data, iQueryNum: 1, iQueryString: item1});
	});

	// Do REST search #2.
	T.get('statuses/user_timeline', { screen_name: item2, exclude_replies: true, include_rts: false, count: numberOfQueries }, function(err, data, response) {
			if (err) {
				console.log("ERROR-  serverApp.js- search #2.");
				console.error(err.stack);
			}
			socket.emit('eServerReturnsTwitterResult_'+ comparisonId, {iData: data, iQueryNum: 2, iQueryString: item2});
	});
}

// Twitter credentials.
// Replace these with your own!
// DEV: Using Alex's keys.
var T = new Twit({
		consumer_key: 'P8EYI0gloJoDTOu8596QcUn1c'
	, consumer_secret: 'Ya8PmkQxm7FLdQ6coftOi65hSedUNevFVil0kApw45YEI22mMd'
	, access_token: '234878749-OlktDQaRgvr6hkBoQ4kI94y7sxI1EfpOlH17rwTG'
	, access_token_secret: 'nKpgBcCd20RFXeASCLwACtA80PnEmvBJ6kJcaeA4oSO4a'
});

// Extras - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


// Handle uncaughtException errors, to prevent app from crashing when one happens.
process.on('uncaughtException', function(err) {
	console.error("ERROR- uncaughtException- "+ err.stack);
});