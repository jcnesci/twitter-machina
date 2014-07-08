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

// 
function queryBlockController(iQuery){
	console.log("queryBlockController- iQuery : "+ iQuery);

	if (iQuery != "custom"){
		cgApp.switchCurComparison(Number(iQuery));
	} else {
		cgApp.customComparison();
	}
}