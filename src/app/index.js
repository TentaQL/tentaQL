const React = require("react");
const ReactDOM = require("react-dom");
import { Component } from "react";
import { ModalExampleDimmer } from "./components/Modal.js";
import Navbar from "./components/Navbar";
import TextBox from "./components/TextBox";
import { Button, Icon, Input, Checkbox, Form, Menu, Placeholder } from "semantic-ui-react";
require("./index.css");
require("../codemirror/lib/codemirror.css");
require("codemirror/mode/javascript/javascript");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
      data: "",
      url: "",
      placeholder: "Enter Your Database URL Here...",
      // placeholderColor: 
    };
    this.credentialsHandler = this.credentialsHandler.bind(this);
    this.connectionHandler = this.connectionHandler.bind(this);
    this.searchBarHandler = this.searchBarHandler.bind(this);
  }

  credentialsHandler(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }
  searchBarHandler(event) {
    this.setState({ url: event.target.value });
  }

  connectionHandler() {
    let credentials = {
      url: this.state.url
    };
    if (this.state.url === '') {
      this.setState({placeholder: "Please input a valid database URL", })
    } else {
    fetch("http://localhost:8080/db", {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: "POST",
      body: JSON.stringify(credentials)
    })
      .then(res => {
        fetch("http://localhost:8080/db/all")
          .then(res => {
            return res.json();
          })
          .then(res => {
            let replaced = res.replace(/\r\n/g, "λ");
            this.setState({ data: replaced, modal: false, clipBoardData: res, url: "" });
          });
      })
      .catch(err => {
        console.log(err);
      });
    }
  }

  render() {
    return (
      <div>
        <ModalExampleDimmer
          data={this.state}
          credentialsHandler={this.credentialsHandler}
          connectionHandler={this.connectionHandler}
          placeholder={this.state.placeholder}
        />
        <Navbar url={this.state.url} searchBarHandler={this.searchBarHandler} connectionHandler={this.connectionHandler} />
        <TextBox
          className="textbox"
          data={this.state.data}
          clipboardData={this.state.clipboardData}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
