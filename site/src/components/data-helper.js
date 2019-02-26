
// Helper functions converting different data fields into canonical internal formats.
class DataHelper {
    static getDataFromProps(props) {
        var data = undefined;

        // The simplest format is a JSON string.
        if (props.data !== undefined) {
            if (props.data instanceof Array || props.data instanceof Object) {
                return props.data;
            }
            try {
                data = JSON.parse(props.data);
            } catch(err) {
                data = eval(`(${props.data})`);
            }
            return data;
        }
        
        // Handles different types.
        if (props.graph !== undefined) {
            // Collects nodes and edges information.
            data = {
                nodes: [],
                edges: [],
            }
            const readNode = (props) => {
                return props.id;
            }
            const readEdge = (props) => {
                // u, v, modifiers
                var ret = [0, 0, {}]
                if (props.data !== undefined) {
                    var seg = [0, 0]
                    try {
                        seg = JSON.parse(props.data);
                    } catch(err) {
                        seg = eval(`(${props.data})`);
                    }
                    ret[0] = seg[0]
                    ret[1] = seg[1]
                    Object.assign(ret[2], seg[2]||{});
                }
                if (props.u !== undefined) ret[0] = props.u;
                if (props.v !== undefined) ret[1] = props.v;
                if (props.bendleft !== undefined) ret[2].bendleft = true;
                if (props.bendright !== undefined) ret[2].bendright = true;
                console.log(ret)
                return ret;
            }
            const walk = (children) => {
                console.log(children)
                for (let child of children) {
                    if (child instanceof Object) {
                        if (child.type === "node") {
                            data.nodes.push(readNode(child.props));
                        }
                        if (child.type === "edge") {
                            data.edges.push(readEdge(child.props));
                        }
                    }
                }
            }
            walk(props.children)
            return data;
        }
    }
};

export default DataHelper;