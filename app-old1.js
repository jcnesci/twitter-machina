var     Twit = require('twit')
    ,   express = require('express')
    ,   http = require('http')
    ,   server = http.createServer(app)
    ,   socketIo = require('socket.io').listen(server)
    ,   stylus = require('stylus')
    ,   sentiment = require('sentiment')

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var app = express();
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
}
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.set("view options", { layout: false });         // don't use a template layout for Jade, which is default.
app.use(express.logger('dev'))
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
))
app.use(express.static(__dirname + '/public'))

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var T = new Twit({
    consumer_key: 'kEwsveRmFIRibVAIq43NAIjCt'
  , consumer_secret: 'VNgTmvWXyW7j8nJdIEQowmdhmutu3iB9Ee7WcgWzWSPjMNGJbF'
  , access_token: '40685218-xsWo4c9s23Tr6UEXQbE5VjUeWEH2hUpaKW0vOCBS0'
  , access_token_secret: '2nAecFy6Y9rRyUQflekTumONqYFzYSrGr4n1cgifareuQ'
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// Twitter Streaming page.
app.get('/stream', function (req, res) {
    res.render('stream.jade');
});

server.listen(3000);
// app.listen(3000, function(){
//     console.log("App: Listening on port 3000.")
// });

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
/*
app.get('/       tchTwitter', function (req, res) {
    var stream = T.stream('statuses/filter', { track: "bieber" })
    stream.on('tweet', function (tweet) {
        res.send(tweet.text);
        console.log(tweet.text);   
    })
});
*/
socketIo.sockets.on('connection', function(socket) {

  socket.emit('news', {hello: 'world'});
  console.log('Emitting Hello World.')

  // twit.stream('statuses/filter', {'locations':'-80.10,26.10,-80.05,26.15'},
  //   function(stream) {
  //     stream.on('data',function(data){
  //       socket.emit('twitter',data);
  //     });
  //   });

    //
       

});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

/*
// Twitter REST searches
T.get('search/tweets', { q: 'doorknob butter', count: 100 }, function(err, data, response) {
  console.log(data)
})
// 
T.get('statuses/user_timeline', { screen_name: 'sosolimited', count: '200' }, function(err, data, response) {
  console.log(data)
})
// filter the public stream by the latitude/longitude bounded box of San Francisco
// var sanFrancisco = [ '-122.75', '36.8', '-121.75', '37.8' ]
var sanDiego = [  '-117.169836', '32.722074', '-117.129767', '32.743414' ]
var stream = T.stream('statuses/filter', { locations: sanDiego })
stream.on('tweet', function (tweet) {
  console.log(tweet)
})
*/

/*
// OLD streaming code.
// Twitter Streaming page.
app.get('/watchTwitter', function (req, res) {
    var testTweetCount = 0;
    var phrase = 'bieber';
    var allTweets;
    var allTweetsFormatted;

    var stream = T.stream('statuses/filter', { track: phrase })
    stream.on('tweet', function (tweet) {
        //  - - - - - OLD
        // res.send(tweet);

        // - - - - - NEW
        testTweetCount++;
        allTweets += tweet;
        // Update every 50 tweets.
        if (testTweetCount % 5 === 0) {
            allTweetsFormatted = JSON.stringify(allTweets, null, 4);
            res.send(allTweetsFormatted);
            console.log("Tweet #"+ testTweetCount + ": "+ tweet.text);           // output tweet's text to terminal.
        }
        
    })

});
*/

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

/*
// Index page.
app.get('/', function(req, res){
    // - - - - OLD
    // res.send("Hello world, from Express.");
    // res.render('index', {layout:false, message:"Hello from Jade!"});

    // - - - - - DEV
    T.get('search/tweets', { q: 'doorknob butter', count: 100 }, function(err, data, response) {
        data = JSON.stringify(data, null, 4);
        res.render('index', {layout:false, message:data});
    })
})
// Sentiment page.
app.get('/testSentiment',
    function (req, res) {
        var response = "<HEAD>" +
          "<title>Twitter Sentiment Analysis</title>\n" +
          "</HEAD>\n" +
          "<BODY>\n" +
          "<P>\n" +
          "Welcome to the Twitter Sentiment Analysis app.  " +   
          "What phrase would you like to analzye?\n" +                
          "</P>\n" +
          "<FORM action=\"/testSentiment\" method=\"get\">\n" +
          "<P>\n" +
          "Enter a phrase to evaluate: <INPUT type=\"text\" name=\"phrase\"><BR>\n" +
          "<INPUT type=\"submit\" value=\"Send\">\n" +
          "</P>\n" +
          "</FORM>\n" +
          "</BODY>";
        var phrase = req.query.phrase;
        if (!phrase) {
            res.send(response);
        } else {
            sentiment(phrase, function (err, result) {
                response = 'sentiment(' + phrase + ') === ' + result.score;
                res.send(response);
            });
        }
    });
*/
