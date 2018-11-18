const React = require("react");
const ReactDOM = require("react-dom");
import { Component } from "react";
import { ModalExampleDimmer } from "./components/Modal.js";
import Navbar from "./components/Navbar";
const FileSaver = require('file-saver');
const serverCreator = require("./boilerFunc/serverCreator");
const schemaCreator = require("./boilerFunc/schemaCreator");
import TextBox from "./components/TextBox";
require("./index.css");
const JSZip = require("jszip");
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
      persistedURL: "",
      schema: "",
      resolvers: "",
      lambdaLess: "",
    };
    this.credentialsHandler = this.credentialsHandler.bind(this);
    this.connectionHandler = this.connectionHandler.bind(this);
    this.searchBarHandler = this.searchBarHandler.bind(this);
    this.downloadZip = this.downloadZip.bind(this);
  }

  credentialsHandler(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }
  searchBarHandler(event) {
    this.setState({ url: event.target.value });
  }

  downloadZip() {
    console.log("Zip was clicked.")
    var zip = new JSZip();
    let schema = this.state.clipBoardData;
    zip.folder("tentaQL").folder("client").folder("graphql").file("schema.js", schemaCreator());
    zip.folder("tentaQL").file("server.js", serverCreator(this.state.persistedURL));
    zip.folder("tentaQL").folder("client").folder("graphql").file("resolvers.js", this.state.resolvers);
    zip.folder("tentaQL").folder("client").folder("graphql").file("schema.graphql", schema);

    zip.generateAsync({type:"blob"}).then(function (blob) { 
        saveAs(blob, "TentaQL.zip");                          
    });
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
        this.setState({persistedURL: this.state.url})
        fetch("http://localhost:8080/db/all")
          .then(res => {
            return res.json();
          })
          .then(res => {
            let replaced = res.frontEnd.replace(/\r\n/g, "λ");
            this.setState({ data: replaced, modal: false, schema: res.schema, resolvers: res.resolvers, clipBoardData: res.frontEnd, url: ""});
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
        <Navbar persistedURL={this.state.persistedURL} resolvers={this.state.resolvers} schema={this.state.schema}  data={this.state.data} url={this.state.url} searchBarHandler={this.searchBarHandler} downloadZip={this.downloadZip} connectionHandler={this.connectionHandler} lambdaLess={this.state.lambdaLess} />
        <TextBox
          className="textbox"
          data={this.state.data}
          lambdaLess={this.state.lambdaLess}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
