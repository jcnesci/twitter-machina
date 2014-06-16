// Globals - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var dataTwitterGetResult_1;		// Results from 1st Twitter GET query.
var dataTwitterGetResult_2;

$(function(){

	// Setup - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

	// connect to the socket server
	var socket = io.connect(); 

	
	// Main - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
	

	// Receive Twitter REST Search results.
	socket.on('eTwitterGetResult_1', function (data) {
		dataTwitterGetResult_1 = data;
		
		// Print data to webpage just to see it.
		printTwitterResults(dataTwitterGetResult_1, '#twitter_results_1 ul');

		// Turn tweets into an array of words.
		buildTweetBallMethod1(dataTwitterGetResult_1);
	});

	socket.on('eTwitterGetResult_2', function (data) {
		dataTwitterGetResult_2 = data;
		
		// Print data to webpage just to see it.
		printTwitterResults(dataTwitterGetResult_2, '#twitter_results_2 ul');
	});


	// OLD STUFF - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 


	// // if we get an "info" emit from the socket server then console.log the data we recive
	// socket.on('info', function (data) {
	//     console.log(data);
	// });

	// --- STREAM OFF FOR NOW ---
	// // On "twitter" event, append the tweet's text to the ul.
	// socket.on('twitter_stream', function (data) {
	//     console.log(data);
	    
	//     // Show only the last 5 tweets from stream.
	//     if ($('ul.tweet_list').children().length >= 5) {
	//     	$('ul.tweet_list li').first().remove();
	//     	console.log("delete!");
	//     }
 	// 	 $('ul.tweet_list').append('<li>'+ data.text +'</li>');
	// });
});


// Functions - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 


// Creating a ball of tweets using the method I used for the first Intel Sketch with dream-like floating words.
function buildTweetBallMethod1(data) {

	var arrTweetWords_1 = [];

	$.each(data, function(key, value){
		var tweetText = value.text;
		arrTweetWords_1.push(tweetText.cleanTweet().split(" "));

	});

	console.log("* * * * * * * *");
	console.log(arrTweetWords_1);

	// _.flatten(arrTweetWords_1);
	console.log("* * * * * * * *");
	console.log(arrTweetWords_1);

}

// Print data from Twitter JS object into an html element.
function printTwitterResults(data, domElementTitle) {
	$.each(data, function(key, value){
		var tweetText = value.text;
		$(domElementTitle).append('<li>'+ tweetText.cleanTweet() +'</li>');
	});
}


// Common function, to clean a tweet of unwanted features.
	String.prototype.cleanTweet = function() {		
		var tweet = this;
		// NB: we're not doing it now, but it's possible to store the regex matches in arrays for later use. We would need to use .
		tweet = tweet.replace(/@([a-zA-Z0-9]+)/g, "");	// remove user mentions.
		tweet = tweet.replace(/(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/g, "");	// remove http links.
		tweet = tweet.replace(/: /, " ");		// remove colons at the end of a word.
		$.trim(tweet);	// Remove leading and trailing whitespace.
			// return this.replace(/^\s+|\s+$/g,"");		// regex for trim fct.

		return tweet;
	}