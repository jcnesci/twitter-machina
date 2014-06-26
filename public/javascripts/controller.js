/*
Controller.js
Contains the code relative to the Controller parts of the app (following an MVC approach).
*/


// General function to assign button actions @start.
function setupButtons(){
	// Next btn to go between states within a Query.
	$("#state_selector > #next").click(function() { 
		cgApp.curComparison.nextState();				//TODO_jc: make this actually go to the next state.
	});
}

// Handles click on query dropdown.
function ddController(){

	var domSelect = document.getElementById("dd-queries");
	var selectedQuery = domSelect.options[domSelect.selectedIndex].value;
	
	console.log("FROM CONTROLLER: " + selectedQuery);

	socket.emit('eReceiveSelectedQuery', selectedQuery);
}


