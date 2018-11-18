const React = require("react");
const ReactDOM = require("react-dom");
import { connect } from 'react-redux';
import { Component } from "react";
import { UnControlled as CodeMirror } from "react-codemirror2";
import { codeMirrorUpdate } from '../actions/textBoxActions';

import Clipboard from "react-clipboard.js";

import {
  Button,
} from "semantic-ui-react";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/lint/lint";
import "codemirror-graphql/hint";
import "codemirror-graphql/lint";
import "codemirror-graphql/mode";

class TextBox extends Component {

  render() {
    
    return (
      <div>
        <Clipboard
          className="clipboard"
          component="a"
          button-href="#"
          data-clipboard-text={this.props.currentSchema}
        >
        <Button>Copy Changes To Clipboard</Button>
        </Clipboard>
        <CodeMirror
          className="codeeditor"
          value={this.props.codeMirrorLambda}
          options={{
            // mode: 'javascript',
            lineSeparator: `λ`,
            lineWrapping: false,
            lineNumbers: true,
            readOnly: false
          }}
          onChange={(editor, metadata, value) => {
            this.props.dispatch(codeMirrorUpdate(value));
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { currentSchema: state.currentSchema,
            codeMirrorLambda: state.codeMirrorLambda };
};

export default connect(mapStateToProps)(TextBox);
