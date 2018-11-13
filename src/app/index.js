const React = require("react");
const ReactDOM = require("react-dom");
import {Component} from "react";
require("./index.css");
import Navbar from "./components/Navbar"
import TextBox from "./components/TextBox"
import {Button, Icon, Input, Checkbox, Form, Menu} from "semantic-ui-react";

class App extends Component {
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
