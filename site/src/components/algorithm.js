import React, { Component } from 'react';
import { filter } from 'minimatch';

class Algorithm extends Component {
    constructor(props) {
        super(props);
        console.log(props);
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

        // Handle Display.

        var gen = solver(input);
        var history = [gen.next()];

        // Set States.
        this.state = {
            solver: solver,
            input: input,
            displays: alldisplays,
            generator: gen,
            stepId: 0,
            history: history,
        }
        
    }
    render() {
        return (
            <div>

                <div className="has-text-centered">
                <button>Prev</button>
                <span> Step: 0 </span>
                <button>Next</button>
                </div>
            </div>
        )
    }
};

export default Algorithm;