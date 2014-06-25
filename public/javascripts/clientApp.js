// Represents the entire Common Ground app. This object must be created to run the project.
function clientApp(){

	// --- Properties
	this.comparisons = [];
	this.curComparison = null;
	
	// --- Behavior
	// Comparison objects
	var comparison1 = new comparison("BarackObama", "MichelleObama");
	this.comparisons.push(comparison1);
	this.curComparison = comparison1;					//TODO: later, the dropdown should affect the curComparison.
	// Button setup
	setupButtons();


	console.log("clientApp- comparisons :");
	console.log(this.comparisons);
}
clientApp.prototype = {

}

