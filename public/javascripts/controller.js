/*
Controller.js
Contains the code relative to the Controller parts of the app (following an MVC approach).
*/

// 
function ddController(){

	var domSelect = document.getElementById("dd-queries");
	var selectedQuery = domSelect.options[domSelect.selectedIndex].value;
	
	console.log("FROM CONTROLLER: " + selectedQuery);

	socket.emit('eReceiveSelectedQuery', selectedQuery);
}