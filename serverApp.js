var express = require('express')
	, http = require('http')
	, Twit = require('twit')
	, _ = require('underscore')
	, path = require("path");

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
	app.set('view engine', 'ejs');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.static(__dirname + '/public'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

// Web pages & routes - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Routes to the various pages.
app.get('/', function (req, res) {
		res.render('index',
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
						if (curSearch1 > numberOfQueries*5) {
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
						if (curSearch2 > numberOfQueries*5) {
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