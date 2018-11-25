const React = require("react");
const ReactDOM = require("react-dom");
import { Provider } from "react-redux";
import store from "./store";
import { Component } from "react";
import { ModalExampleDimmer } from "./components/Modal.js";
import { searchUpdate } from "./actions/searchActions";
import { zipFiles } from "./actions/zipActions";
import { currentSearch } from "./actions/searchActions";
import { saveData } from "./actions/searchActions";

import Navbar from "./components/Navbar";
import TextBox from "./components/TextBox";
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

      placeholder: "Enter Your PostgreSQL URL Here...",
      persistedURL: "",
      dummyCodeMirror: "",
      schema: "",
      resolvers: ""
    };
    this.connectionHandler = this.connectionHandler.bind(this);
    this.searchBarHandler = this.searchBarHandler.bind(this);
    this.downloadZip = this.downloadZip.bind(this);
  }

  searchBarHandler(event) {
    event.preventDefault();
    store.dispatch(searchUpdate(event.target.value, event.target.id));
    this.setState({ url: event.target.value });
  }

  downloadZip(event) {
    event.preventDefault();
    store.dispatch(zipFiles(event.target.id));
  }

  connectionHandler(event) {
    event.preventDefault();
    store.dispatch(currentSearch());
    let credentials = {
      url: this.state.url
    };
    if (this.state.url === "") {
      this.setState({ placeholder: "Please input a valid database URL" });
    } else {
      fetch("http://localhost:8080/db", {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: "POST",
        body: JSON.stringify(credentials)
      })
        .then(res => {
          this.setState({ persistedURL: this.state.url });
          fetch("http://localhost:8080/db/all")
            .then(res => {
              return res.json();
            })
            .then(res => {
              let replaced = res.frontEnd.replace(/\r\n/g, "λ");
              store.dispatch(saveData(res));
              this.setState({ modal: false, url: "" });
            });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  render() {
    return (
      <Provider store={store}>
        <div>
          <ModalExampleDimmer
            data={this.state}
            connectionHandler={this.connectionHandler}
            searchBarHandler={this.searchBarHandler}
            mongoConnectionHandler={this.mongoConnectionHandler}
            mongoURLHandler={this.mongoURLHandler}
          />
          <Navbar
            searchBarHandler={this.searchBarHandler}
            connectionHandler={this.connectionHandler}
          />
          <TextBox className="textbox" downloadZip={this.downloadZip} />
        </div>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
