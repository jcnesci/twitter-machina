// Represents the entire Common Ground app. This object must be created to run the project.
function clientApp(){

	// --- Properties
	this.comparisons = [];
	
	// --- Behavior
	var comparison1 = new comparison("BarackObama", "MichelleObama");
	this.comparisons.push(comparison1);

	console.log("clientApp- comparisons :");
	console.log(this.comparisons);
}
clientApp.prototype = {

}

