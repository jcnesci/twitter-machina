$(function(){


	// Setup - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 


	function cleanTweet(tweet) {		
		// NB: we're not doing it now, but it's possible to store the regex matches in arrays for later use. We would need to use .
		tweet = tweet.replace(/@([a-zA-Z0-9]+)/g, "");	// remove user mentions.
		tweet = tweet.replace(/(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/g, "");	// remove http links.
		tweet = tweet.replace(/: /, " ");		// remove colons at the end of a word.
		$.trim(tweet);	// Remove leading and trailing whitespace.
			// return this.replace(/^\s+|\s+$/g,"");		// regex for trim fct.

		return tweet;
	}

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


	// Main - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 


	// connect to the socket server
	var socket = io.connect(); 

	// if we get an "info" emit from the socket server then console.log the data we recive
	socket.on('info', function (data) {
	    console.log(data);
	});

	// Twitter REST Search
	socket.on('eTwitterGetResult_1', function (data) {
		// Turn tweet data into JSON format.
		JSON.stringify(data, null, 4);
		
		// Append each tweet's text to the HTML.
		$.each(data, function(key, value){
			var tweetText = value.text;
			$('#twitter_results_1 ul').append('<li>'+ tweetText.cleanTweet() +'</li>');
		});
	});
	socket.on('eTwitterGetResult_2', function (data) {
		// Turn tweet data into JSON format.
		JSON.stringify(data, null, 4);
		
		// Append each tweet's text to the HTML.
		$.each(data, function(key, value){
			var tweetText = value.text;
			$('#twitter_results_2 ul').append('<li>'+ cleanTweet(tweetText) +'</li>');
		});
	});


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