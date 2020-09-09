import React from 'react'
/**
  *   React.createElement(
  *   type,
  *   [props],
  *   [...children]
) */

class Node {
    name: string = ''
    props = {}
    render() {
        return <div>{this.name}</div>
    }
}

export default class Tree extends React.Component {
    render() {
        return React.createElement('h1', null, 'Hellow')
    }
}
