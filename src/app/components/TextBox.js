const React = require("react");
const ReactDOM = require("react-dom");
import {Component} from "react";
import {Button, Icon, Input, Checkbox, Form, Menu, Sticky} from "semantic-ui-react";
const CodeMirror = require('react-codemirror');

class TextBox extends Component{
  constructor (props) {
    super(props)
    this.state = null
  }
  render() {
    return (
      <div>
        <CodeMirror class="textarea" value={this.state} />
      </div>
    );
  }
}

export default TextBox;
