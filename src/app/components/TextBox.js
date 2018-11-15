const React = require('react');
const ReactDOM = require('react-dom');
import { Component } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import {
  Button,
  Icon,
  Input,
  Checkbox,
  Form,
  Menu,
  Sticky
} from 'semantic-ui-react';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/lint/lint';
import 'codemirror-graphql/hint';
import 'codemirror-graphql/lint';
import 'codemirror-graphql/mode';
// require('codemirror/mode/javascript/javascript');

class TextBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log("I'm here")
  //   console.log(this.props.data)
  //   if (this.props.data != nextProps.data) {
  //     this.setState({
  //       name: nextProps.data
  //     })
  //     return true
  //   } else {
  //     return false
  //   }
  // }

  render() {
    console.log(this.props.data)
    // let myCodeMirror = CodeMirror(document.body, {
    //   lineNumbers: true,
    // })
    return (
      <div>
        <CodeMirror
          className="codeeditor"
          value= {this.props.data}
          options={{
            // mode: 'javascript',
            lineNumbers: true,
            readOnly: false,
          }}
          onChange={(editor, metadata, value) => {
            this.setState({ value });
          }}
        />
      </div>
    );
  }
}

export default TextBox;
