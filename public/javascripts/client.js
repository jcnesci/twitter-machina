$(function(){

	// connect to the socket server
	var socket = io.connect(); 

	// if we get an "info" emit from the socket server then console.log the data we recive
	socket.on('info', function (data) {
	    console.log(data);
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
 //    	$('ul.tweet_list').append('<li>'+ data.text +'</li>');
	// });

	// Twitter REST Search
	socket.on('twitter_search', function (data) {
		
		// Turn tweet data into JSON format.
		JSON.stringify(data, null, 4);
		
		// Append each tweet's text to the HTML.
		$.each(data, function(key, value){
			$('#tweet_search').append(value.text);
		});

	});

});