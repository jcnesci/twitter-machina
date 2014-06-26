// Compares words from 2 twitter feeds to one another.

var socket = null;

// Params: item1 = a twitter username, item2 = a twitter username.
function comparison(item1, item2){

	// --- Properties
	this.item1 = item1;
	this.item2 = item2;
	this.stateMachine = null;

	// --- Behavior
	this.buildStateMachine();
	this.stateMachine.gotoState("intro");
	// 
	// console.log("* * * * * * * * states = ");
	// console.log(this.stateMachine.states);
	// console.log("* * * * * * * * transitions = ");
	// console.log(this.stateMachine.transitions);
	// console.log("* * * * * * * * curState = "+ this.stateMachine.curState.name);

	// Show first state view.
	introView();

	// connect to the socket server
	socket = io.connect(); 

	// TODO: tell server which twitter handles to search for.
	// socket.emit('eReceiveSelectedQuery', selectedQuery);

	
	// Receive Twitter search results.
	socket.on('eReceiveTwitterResult', function (iResponse) {
		
		logTwitterResults(iResponse);

		// Store query results.
		if(iResponse.iQueryNum == 1){
			dataTwitterGetResult_1 = iResponse.iData;
		} else if(iResponse.iQueryNum == 2){
			dataTwitterGetResult_2 = iResponse.iData;
		}

		// When all data received, trigger the views.
		if(dataTwitterGetResult_1 != null && dataTwitterGetResult_2 != null){
			// console.log("t- ALL QUERIES RECEIVED");
			allQueriesReceived = true;			// Currently unused.
			
			// Clear Model & View items.
			emptyModelItems();
			// emptyViewItems();
			// Create sets.
			createSet(dataTwitterGetResult_1, "set1");
			createSet(dataTwitterGetResult_2, "set2");
			emptyResultObjects();
			// Display diagram.
			// listView();																			//DEV: moved to setState().


			console.log(sets);
		}

	});
	

}
comparison.prototype = {
	// Define the state machine transitions here.
	buildStateMachine: function(){
		this.stateMachine = new sosoStateMachine();

		this.stateMachine.addTransition("intro", "tweetList");
		this.stateMachine.addTransition("tweetList", "wordBlocks");
	},
	// TODO: instead of using IF statemtn for each step, make this automatically know what the enxt state is.
	nextState: function(){

		if (this.stateMachine.curState == this.stateMachine.getState("intro")){

			var stateChangeSuccess = this.stateMachine.gotoState("tweetList");
			// If the transition is valid, do stuff.
			if (stateChangeSuccess) {

				emptyViewItems();
				listView();													// Fill content div with tweetList content.
			}
		} else if (this.stateMachine.curState == this.stateMachine.getState("tweetList")){

			var stateChangeSuccess = this.stateMachine.gotoState("wordBlocks");
			// If the transition is valid, do stuff.
			if (stateChangeSuccess) {

				emptyViewItems();
				initialTweetBubblesView();
			}
		}

	}
}