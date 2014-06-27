// Represents the entire Common Ground app. This object must be created to run the project.
function clientApp(){

	// --- Properties
	this.comparisons = [];
	this.curComparison = null;
	
	// --- Behavior
	// Comparison objects
	// var comparison1 = new comparison("BarackObama", "MichelleObama");
	this.comparisons.push(new comparison(1, "BarackObama", "MichelleObama"));
	this.comparisons.push(new comparison(2, "WholeFoods", "McDonalds"));
	this.comparisons.push(new comparison(3, "facebook", "twitter"));
	this.comparisons.push(new comparison(4, "foxnews", "mnsbc"));
	this.curComparison = this.comparisons[0];					//TODO: later, the dropdown should affect the curComparison.
	// Button setup
	setupButtons();
	// Setup drowdown buttons here (cant be done in setupButtons because that runs before cgApp()'s constructor is done and cdApp witl be undefined at that moment).
	for (var i = 0; i < this.comparisons.length; i++){
			console.log("clientApp.js- eServerReturnsTwitterResult- * * * * * * * * * * * * * * * ** * *");
			$("#dd_queries").append("<option value='query"+ this.comparisons[i].id +"'>"+ this.comparisons[i].item1 +" / "+ this.comparisons[i].item2 +"</option>");
			this.comparisons[i].setupServerCalls();
	}
	// Display the first comparison.
	// this.comparisons[0].
	// attach reloadCOntent when select new item in dropdown


	console.log("clientApp- comparisons :");
	console.log(this.comparisons);
}
clientApp.prototype = {

}

