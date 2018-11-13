const React = require("react");
const ReactDOM = require("react-dom");
import {Component} from "react";
require("./index.css");
import Navbar from "./components/Navbar"
import TextBox from "./components/TextBox"
import {Button, Icon, Input, Checkbox, Form, Menu} from "semantic-ui-react";
var CodeMirror = require('react-codemirror');

class App extends Component {


  // var App = React.createClass({
  //   getInitialState: function() {
  //     return {
  //       code: "// Code",
  //     };
  //   },
  //   updateCode: function(newCode) {
  //     this.setState({
  //       code: newCode,
  //     });
  //   },
  //   render: function() {
  //     var options = {
  //       lineNumbers: true,
  //     };
  //     return <CodeMirror value={this.state.code} onChange={this.updateCode} options={options} />
  //   }
  // });

  render() {
    return (
      <div>
        <Navbar/>
        <TextBox/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
