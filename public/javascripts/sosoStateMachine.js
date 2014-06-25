function sosoStateMachine(){

	this.curState = null;
	this.curTransition = null;
	this.isTransitionBlocking = false;

	this.states = [];
	this.transitions = [];

}
sosoStateMachine.prototype = {
	addState: function(iStateName){
		var newState = new sosoState(iStateName);
		this.states.push(newState);
		return newState;
	},
	addTransition: function(iTransitionName){
		var newTransition = new sosoTransition(iTransitionName);
		this.transitions.push(newTransition);
		return newTransition;
	},
	/*
	gotoState: function(iStateName){
		if(this.curState == null){
			curState = iStateName;
			console.log("sosoStateMachine- gotoState- curState is NULL, setting state to: "+ iStateName);
		} else {
			if ((this.isTransitionBlocking && curTransition == null) || !this.isTransitionBlocking){
				// Look for the transitions is existing array.
				for (var i=0; i < transitions.length; i++){
					if (transitions[i].startState == this.curState && transitions[i].endState == iStateName){
						// Start the transition if it's startState matches our curState and its endState matches our provided state.
						startTransition(transitions[i]);
						return true;
					}
				}
				return false;
			} else {
				return false;
			}
		}
		
		// - - - - -
		// $.inArray(iStateName, states);
	}
	*/
}