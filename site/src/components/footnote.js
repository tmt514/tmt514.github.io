
import React from 'react';
import visit from 'unist-util-visit';
import u from 'unist-builder';

export const footnoteTransformer = function(options) {
    function transformer(node, file) {
        const dict = {};
        visit(node, 'element', function(node) {
            const {type, tagName, properties} = node;
            if (tagName === "footnote") {
                if (properties.goto !== undefined) {
                    dict[properties.goto] = node;
                }
            }
        });
        visit(node, 'element', function(node) {
            const {type, tagName, properties} = node;
            if (tagName === "footnote") {
                if (properties.here !== undefined && dict[properties.here] !== undefined) {
                    var far = dict[properties.here];
                    var near = node;
                    // This has to be static.
                    var id_far = `fn-${properties.here}-far`;
                    var id_near = `fn-${properties.here}-near`;
                    //var id_far = Math.random().toString(36).substr(2);
                    //var id_near = Math.random().toString(36).substr(2);
                    var display = far.properties.show || properties.here;
                    far.tagName = "span";
                    far.children.push(u('element', {tagName: 'a', properties: {href: `#${id_near}`}}, [u('text', `[👣${display}]`)]));
                    far.properties.id = id_far;
                    far.properties.style = {
                        verticalAlign: "super",
                        fontSize: "60%",
                    };
                    near.tagName = "span";
                    near.children.push(u('element', {tagName: 'a', properties: {href: `#${id_far}`}}, [u('text', `[🔙]`)]));
                    near.properties.id = id_near;
                    near.properties.style = {
                        verticalAlign: "super",
                        fontSize: "60%",
                    };
                }
            }
        });
    }
    return transformer;
};