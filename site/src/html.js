import React from "react"
import PropTypes from "prop-types"

export default class HTML extends React.Component {
  render() {
    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          {this.props.headComponents}
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" integrity="sha384-gfdkjb5BdAXd+lj+gudLWI+BXq4IuLW5IT+brZEZsLFm++aCMlF1V92rMkPaX4PP" crossOrigin="anonymous"></link>
          <script type="text/javascript" dangerouslySetInnerHTML={{ __html: `
            window.MathJax = {
              TeX: {
                extensions: ["action.js"],
                Macros: {
                    set: ["{\\\\left\\\\{#1\\\\right\\\\}}", 1],
                    dp: "\\\\mathrm{DP}",
                    red: ["{\\\\color{red}{#1}}", 1],
                    blue: ["{\\\\color{blue}{#1}}", 1],
                    green: ["{\\\\color{green}{#1}}", 1],
                  }
                },
              tex2jax: {
                inlineMath: [ ['$','$'], ['$$','$$'] ],
                processEscapes: true
              },
            };
            `}} />
        </head>
        <body {...this.props.bodyAttributes}>
          {this.props.preBodyComponents}
          <div
            key={`body`}
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
          <script type="text/javascript" 
            src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-AMS_SVG">
          </script>
          <script async={true} src="https://www.googletagmanager.com/gtag/js?id=UA-68887724-3"></script>
          <script type="text/javascript" dangerouslySetInnerHTML={{ __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-68887724-3');
  `}} />
        </body>
      </html>
    )
  }
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
