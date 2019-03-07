import React from 'react';
import visit from 'unist-util-visit';
import u from 'unist-builder';

export const tagTransformer = function(options) {
    function transformer(node, file) {
        visit(node, 'element', function(node) {
            const {type, tagName, properties} = node;
            if (tagName === "tag") {
                node.tagName = "span";
                node.properties.className = (node.properties.className||"") + " tag is-primary"
            }
            // For leetcode guide use.
            if (tagName === "tag-easy") {
                node.tagName = "span";
                node.properties.style = {
                    backgroundColor: "#5cb85c",
                    borderRadius: "1020px",
                    padding: ".2em .6em .3em",
                    fontSize: "75%",
                    fontWeight: "700",
                    color: "#FFF",
                    whiteSpace: "nowrap",
                    verticalAligh: "baseline",
                }
                node.children.push(u('text', 'Easy'));
            }
            if (tagName === "tag-medium") {
                node.tagName = "span";
                node.properties.style = {
                    backgroundColor: "#F0AD4E",
                    borderRadius: "1020px",
                    padding: ".2em .6em .3em",
                    fontSize: "75%",
                    fontWeight: "700",
                    color: "#FFF",
                    whiteSpace: "nowrap",
                    verticalAligh: "baseline",
                }
                node.children.push(u('text', 'Medium'));
            }
            if (tagName === "tag-hard") {
                node.tagName = "span";
                node.properties.style = {
                    backgroundColor: "#d9534f",
                    borderRadius: "1020px",
                    padding: ".2em .6em .3em",
                    fontSize: "75%",
                    fontWeight: "700",
                    color: "#FFF",
                    whiteSpace: "nowrap",
                    verticalAligh: "baseline",
                }
                node.children.push(u('text', 'Hard'));
            }
        });
    }
    return transformer;
};