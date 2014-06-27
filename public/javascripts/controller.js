/*
Controller.js
Contains the code relative to the Controller parts of the app (following an MVC approach).
*/


// General function to assign button actions @start.
function setupButtons(){

	// Next btn to go between states within a Query.
	$("#state_selector > #next").click(function() { 
		cgApp.curComparison.nextState();
	});
}

// Handles click on query dropdown.
function ddController(){

	var domSelect = document.getElementById("dd_queries");
	var selectedQueryNum = domSelect.options[domSelect.selectedIndex].value;
	// socket.emit('eReceiveSelectedQuery', selectedQueryNum);
	cgApp.switchCurComparison(selectedQueryNum);

	console.log("FROM CONTROLLER: " + selectedQueryNum);
}


