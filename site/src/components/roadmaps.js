import React, {Component} from 'react';

import markdown from './markdown'

const findFirstDescendantByType = (node, type) => {
    if (node.type === type) return node;
    const {children} = node;
    if (children !== undefined) {
        for (var i = 0; i < children.length; i++) {
            const t = findFirstDescendantByType(children[i], type);
            if (t !== null) return t;
        }
    }
    return null;
}

export const roadmapTransformer = function(options) {
    if (options.frontmatter !== undefined && options.frontmatter["roadmap_label_h3"] !== null) {
        var my_counter = 0;
        const formatter = options.frontmatter["roadmap_label_h3"]
        function transformer(node, file) {
            const {type, tagName, children} = node;
            if (type === "element" && tagName === "h3") {
                const t = findFirstDescendantByType(node, 'text')
                if (t !== null) {
                    my_counter += 1
                    t.value = formatter.replace(/###/, `${my_counter}`) + t.value;
                }
            } else if (children) {
                children.forEach(transformer);
            }
        }
        return transformer;
    }
    return () => {};
};

class RoadmapSectionTitle extends Component {
    render() {
        return (<h3></h3>);
    }
};

export default RoadmapSectionTitle;