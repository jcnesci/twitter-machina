/*
Controller.js
Contains the code relative to the Controller parts of the app (following an MVC approach).
*/


// General function to assign button actions @start.
function setupButtons(){

	// Next btn to go between states within a Query.
	$("#state_selector > #query-stepper").click(function() { 

		console.log("* * * * * * * * * * * curState : "+ cgApp.stateMachine.curState);

		if (cgApp.stateMachine.curState == cgApp.stateMachine.getState("intro")){
			console.log("* * * * * * * * * * * in INTRO");

			var stateChangeSuccess = cgApp.stateMachine.gotoState("main");
			if (stateChangeSuccess) {
				comparisonListView();
			}

		} else if (cgApp.stateMachine.curState == cgApp.stateMachine.getState("main")){
			console.log("* * * * * * * * * * * in MAIN");

			if (cgApp.curComparison.stateMachine.curState == cgApp.curComparison.stateMachine.getState("tweetList")){
				var stateChangeSuccess = cgApp.curComparison.stateMachine.gotoState("initialTweetBubbles");
				if (stateChangeSuccess) {
					comparisonInitialVennView();
				}
			} else if (cgApp.curComparison.stateMachine.curState == cgApp.curComparison.stateMachine.getState("initialTweetBubbles")){
				var stateChangeSuccess = cgApp.curComparison.stateMachine.gotoState("unionTweetBubbles");
				if (stateChangeSuccess) {
					comparisonUnionVennView();
				}
			} else if (cgApp.curComparison.stateMachine.curState == cgApp.curComparison.stateMachine.getState("unionTweetBubbles")){
				var stateChangeSuccess = cgApp.curComparison.stateMachine.gotoState("outro");
				if (stateChangeSuccess) {
					comparisonOutroView();
				}
			}

		}

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