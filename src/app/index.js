const React = require("react");
const ReactDOM = require("react-dom");
import { Component } from "react";
import { ModalExampleDimmer } from "./components/Modal.js";
import Navbar from "./components/Navbar";
import TextBox from "./components/TextBox";
import { Button, Icon, Input, Checkbox, Form, Menu } from "semantic-ui-react";
require("./index.css");
require("../codemirror/lib/codemirror.css");
require("codemirror/mode/javascript/javascript");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
      user: "",
      password: "",
      host: "",
      port: "",
      dbName: "",
      url: "",
      data: "",
      clipBoardData: ""
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
    console.log("Hello");
    let credentials = {
      user: this.state.user,
      password: this.state.password,
      host: this.state.host,
      port: this.state.port,
      dbName: this.state.dbName
    };
    fetch("http://localhost:8080/db", {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: "POST",
      body: JSON.stringify(credentials)
    })
      .then(res => {
        console.log("I'm done posting now fetching");
        fetch("http://localhost:8080/db/all")
          .then(res => {
            return res.json();
          })
          .then(res => {
            let replaced = res.replace(/\r\n/g, "λ");
            this.setState({ data: replaced, modal: false, clipBoardData: res });
          });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <ModalExampleDimmer
          data={this.state}
          credentialsHandler={this.credentialsHandler}
          connectionHandler={this.connectionHandler}
        />
        <Navbar url={this.state.url} searchBarHandler={this.searchBarHandler} />
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
