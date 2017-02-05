class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.initial = config.initial;
        this.stateNow = this.initial;
        this.configArray = config;
        this.tHistory = [];
        //this.prevStep = null
    }


    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        this.tHistory.push(this.stateNow)
        return this.stateNow
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        this.state = state;
        for(let i in this.configArray.states)
        {
            if(i === state){
                this.prevStep = this.stateNow
                this.stateNow = this.state;
            }
            this.tHistory.push(this.stateNow)
        }

        if(this.stateNow === this.initial)
        {
            throw new Error()
        }
        return this.stateNow
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {

        if(!this.configArray.states[this.stateNow].transitions[event]){
            throw new Error()
        }
        else{
            this.prevStep = this.stateNow;
            this.stateNow = this.configArray.states[this.stateNow].transitions[event];
            this.tHistory.push(this.stateNow);
            return this.stateNow
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.stateNow = this.configArray.initial
        return this.stateNow
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        this.arrStates = []
       if(!event){
           for(let i in this.configArray.states){
               this.arrStates.push(i)
           }
       }
       else{
           if(event !== undefined){
               this.arrStates = [];
               for(let i in this.configArray.states){
                   if(this.configArray.states[i].transitions[event]){
                       this.arrStates.push(i)
                   }
               }
           }
           else{
               this.arrStates = []
           }
       }
        return this.arrStates
    }


    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if(this.stateNow === this.initial || this.tHistory.length === 0){
            return false
        }
        else {
                this.stateNow = this.prevStep;
                this.prevStep = this.tHistory[this.tHistory.length - 1];
                this.tHistory.pop();
                return true;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(this.stateNow === this.initial || this.tHistory.length === 0){
            return false
        }
        else{
                this.stateNow = this.prevStep;
                this.tHistory.push(this.stateNow);
                return true
        }

    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.tHistory = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
