const React = require('react');
const ReactDOM = require('react-dom');
import { Component } from 'react';
import {
  Button,
  Icon,
  Input,
  Checkbox,
  Form,
  Menu,
  Sticky
} from 'semantic-ui-react';
const CodeMirror = require('react-codemirror');
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/lint/lint';
import 'codemirror-graphql/hint';
import 'codemirror-graphql/lint';
import 'codemirror-graphql/mode';

class TextBox extends Component {
  constructor(props) {
    super(props);
    this.state = null;
  }

  render() {
    return (
      <div>
        <CodeMirror className="codeeditor" value={this.state} />
      </div>
    );
  }
}

export default TextBox;

