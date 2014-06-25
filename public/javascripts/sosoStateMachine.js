function sosoStateMachine(){

	this.curState = null;
	this.curTransition = null;
	this.isTransitionBlocking = false;

	this.states = [];
	this.transitions = [];

	console.log("sosoStateMachine- this.states : " + this.states);
	console.log("sosoStateMachine- this.transitions : " + this.transitions);
}
sosoStateMachine.prototype = {
	addState: function(iStateName){
		console.log("sosoStateMachine- addState- iStateName : "+ iStateName);
		
		// Check first if it exists already.
		// if (this.states != undefined){
		// 	for (var i = 0; i < this.states.length; i++){
		// 		if (this.states[i].name == iStateName){
		// 			console.log("sosoStateMachine- addState- state already exists: "+ this.states[i]);
		// 			return this.states[i];
		// 		}
		// 	}
		// }
		var state = this.getState(iStateName);

		if (state){
			// If state exists already, return it.
			return state;
		} else {
			// Otherwise, create it now.
			var newState = new sosoState(iStateName);
			this.states.push(newState);
			return newState;
		}
		
		// console.log("sosoStateMachine- addState- new state: ");
		// console.log(newState);
		console.log("sosoStateMachine- addState- states: ");
		console.log(this.states);
		
	},
	addTransition: function(iStartState, iEndState){
		console.log("sosoStateMachine- addTransition- iStartState : " + iStartState +" | iEndState : "+ iEndState);
		
		var transition = this.getTransition(iStartState, iEndState);

		if (transition){
			return transition;
		} else {
			var newStartState = this.addState(iStartState);
			var newEndState = this.addState(iEndState);
			var newTransition = new sosoStateTransition(newStartState, newEndState);
			this.transitions.push(newTransition);
			// 
			console.log("sosoStateMachine- addTransition- transitions: ")
			console.log(this.transitions);
			// 
			return newTransition;
		}

		//  - - - - - - 

		/*
		var newStartState = this.addState(iStartState);
		var newEndState = this.addState(iEndState);

		// Check if transition exists already.
		if (this.transitions != undefined){
			for (var i = 0; i < this.transitions.length; i++){
				if (this.transitions[i].startState == newStartState && this.transitions[i].endState == newEndState){
					console.log("sosoStateMachine- addTransition- transition already exists: "+ transitions[i]);
					return this.transitions[i];
				}
			}
		}
		
		// Otherwise, create it now.
		var newTransition = new sosoStateTransition(newStartState, newEndState);
		this.transitions.push(newTransition);
		//
		// console.log("sosoStateMachine- addTransition- new transition: ")
		// console.log(newTransition);
		console.log("sosoStateMachine- addTransition- transitions: ")
		console.log(this.transitions);
		// 
		return newTransition;
		*/
	},
	/*
	gotoState: function(iStateName){
		
		// See if state exists.
		var stateToGoTo = null;
		for (var i = 0; i < this.states.length; i++){
			if (this.states[i].name == iStateName){
				stateToGoTo = this.states[i];
			}
		}
		if statesToGoTo

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
	},
	*/
	getState: function(iStateName){
		// If the state exists, return it.
		for (var i = 0; i < this.states.length; i++){
			if (this.states[i].name == iStateName){
				console.log("sosoStateMachine- getState- state already exists: "+ this.states[i]);
				return this.states[i];
			}
		}
		// Otherwise, return null.
		return null;
	},
	getTransition: function(iStartState, iEndState){
		// If the transition exists, return it.
		for (var i = 0; i < this.transitions.length; i++){
			if (this.transitions[i].startState == this.getState(iStartState) && this.transitions[i].endState == this.getState(iEndState)){
				console.log("sosoStateMachine- getTransition- transition already exists: "+ this.transitions[i]);
				return this.transitions[i];
			}
		}
		// Otherwise, return null.
		return null;
	}
	
}