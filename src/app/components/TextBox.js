const React = require("react");
const ReactDOM = require("react-dom");
import { Component } from "react";
import { UnControlled as CodeMirror } from "react-codemirror2";

import Clipboard from "react-clipboard.js";

import {
  Button,
  Icon,
  Input,
  Checkbox,
  Form,
  Menu,
  Sticky
} from "semantic-ui-react";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/lint/lint";
import "codemirror-graphql/hint";
import "codemirror-graphql/lint";
import "codemirror-graphql/mode";
// require('codemirror/mode/javascript/javascript');

class TextBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      value: ""
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
    let unstrung = this.props.data;
    console.log("HELLO WORLD", this.props.data);
    return (
      <div>
        <Clipboard
          className="clipboard"
          component="a"
          button-href="#"
          data-clipboard-text={this.props.clipBoardData}
        >
          <Button>Copy to Clipboard</Button>
        </Clipboard>
        <CodeMirror
          className="codeeditor"
          value={unstrung}
          options={{
            // mode: 'javascript',
            lineSeparator: `λ`,
            // lineWrapping: true,
            lineNumbers: true,
            readOnly: false
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
