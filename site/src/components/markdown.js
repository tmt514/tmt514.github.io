import React, { Component } from 'react'
import unified from 'unified'
import parse from 'remark-parse'
import mathxx from 'remark-math'
import rehype from 'remark-rehype'
import reactRenderer from 'rehype-react'
import visit from 'unist-util-visit'


const addDollarSignToMath = (options) => {
    function transformer(tree, file) {
        visit(tree, 'element', function(node) {
            const hasClass = (node, className) => {
                return node.properties.className && node.properties.className.includes(className)
            }
            const isDisplayMath = hasClass(node, "inlineMathDouble") ||
            (node.tagNmae === "div" && hasClass(node, 'math'))
            const isInlineMath =
            node.tagName === "span" && hasClass(node, "inlineMath") && !isDisplayMath
            
            if (isInlineMath) {
                // handle inline math
                const value = node.children[0].value
                node.children[0].value = '$' + value + '$'
            } else if (isDisplayMath) {
                // handle display math
                const value = node.children[0].value
                node.children[0].value = '$$' + value + '$$'
            }
        })
    }
    return transformer
}

const markdown = unified()
.use(parse)
.use(mathxx, {
    inlineMathDouble: true,
})
.use(rehype)
.use(addDollarSignToMath)
.use(reactRenderer,
    {
        createElement: React.createElement,
        remarkReactComponents: {
        },
    })

export default markdown;