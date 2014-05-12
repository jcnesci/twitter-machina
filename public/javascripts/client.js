$(function(){

	// connect to the socket server
	var socket = io.connect(); 

	// if we get an "info" emit from the socket server then console.log the data we recive
	socket.on('info', function (data) {
	    console.log(data);
	});

	socket.on('twitter', function (data) {
	    console.log(data);
	    $('ul.tweet_list').append('<li>'+ data.text +'</li>');
	});

});