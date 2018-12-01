import React, { Component } from 'react';
import Display from './display';
import UIController from './display-ui/ui-controller';

const clone = (dictionary) => {
    return JSON.parse(JSON.stringify(dictionary))
}

class Algorithm extends Component {
    constructor(props) {
        super(props);
        
        const findAll = function(name) {
            return props.children.filter((x) => x.type === name);
        }
        const findFirst = function(name) {
            return findAll(name)[0];
        }
        const generator = findFirst("generator");
        const inputdata = findFirst("inputdata");
        const alldisplays = findAll("indirectdisplay");
        
        // function*(input) {}
        const code = generator
            .props
            .children
            .filter((x) => x.type === "pre")[0]
            .props
            .children[0];
        const solver = eval("(" + code + ")");

        // Parse input.
        const input = JSON.parse(inputdata.props.data);
        
        // Creates UI environment.
        const ui = new UIController();

        // Creates Generator and history storing all intermediate steps for the
        // algorithm.
        var gen = solver(input, ui);
        var history = [clone(gen.next())];
        var uiHistory = [ui.getSnapshot()];
        ui.clearStyleOnce();

        // Set States.
        this.state = {
            solver: solver,
            input: input,
            displays: alldisplays,
            generator: gen,
            stepId: 0,
            history: history,
            ui: ui,
            uiHistory: uiHistory,
        }
        
    }

    changeStepBy(numMove) {
        const newState = Object.assign({}, this.state);
        newState.stepId += numMove;
        while (newState.history.length <= newState.stepId
            && newState.history[newState.history.length-1].done === false) {
            const nextIter = newState.generator.next();
            newState.history.push(clone(nextIter));
            newState.uiHistory.push(newState.ui.getSnapshot());
            newState.ui.clearStyleOnce();
        }
        newState.stepId = Math.max(0, newState.stepId);
        newState.stepId = Math.min(newState.history.length-1, newState.stepId);
        this.setState(newState);
    }

    render() {
        const stepId = this.state.stepId;
        const snapshot = this.state.history[stepId];
        const uiSnapshot = this.state.uiHistory[stepId];
        const displays = this.state.displays.map((e, idx) => {
            const varname = e.props.varname;
            const uiStore = {
                styleRules: uiSnapshot.styleRules[varname],
                styles: uiSnapshot.styles[varname],
                onceStyles: uiSnapshot.onceStyles[varname],
                annotations: uiSnapshot.annotations[varname],
            };

            return (
                <Display
                    key={idx}
                    {...e.props}
                    uiStoreFromAlgorithm={uiStore}
                    data={JSON.stringify(snapshot.value[e.props.varname])}
                />
        )})
        return (
            <div>
                <div className="has-text-centered">
                <button onClick={this.changeStepBy.bind(this, -1)}>Prev</button>
                <span> Step: {this.state.stepId} </span>
                <button onClick={this.changeStepBy.bind(this, 1)}>Next</button>
                </div>
                {displays}
            </div>
        )
    }
};

export default Algorithm;