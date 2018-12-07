const React = require("react");
const ReactDOM = require("react-dom");
import { Provider } from "react-redux";
import store from "./store";
import { Component } from "react";
import { ModalExampleDimmer } from "./components/Modal.js";
import { ModalLoader } from "./components/ModalLoader.js";
import ModalError from "./components/ModalError";
import { searchUpdate } from "./actions/searchActions";
import { zipFiles } from "./actions/zipActions";
import { resetTab } from "./actions/textBoxActions";
import { resetAll } from "./actions/textBoxActions";
import { currentSearch } from "./actions/searchActions";
import { saveData } from "./actions/searchActions";
import { switchTab } from "./actions/textBoxActions";

import TextBox from "./components/TextBox";
require("./index.css");

require("../codemirror/lib/codemirror.css");
require("codemirror/mode/javascript/javascript");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
      modalLoader: false,
      placeholder:
        "Enter Your Database URI Here"
        // mysql://newuser2:password@localhost/tentaql
    };
    this.connectionHandler = this.connectionHandler.bind(this);
    this.searchBarHandler = this.searchBarHandler.bind(this);
    this.downloadZip = this.downloadZip.bind(this);
    this.resetTab = this.resetTab.bind(this);
    this.resetAll = this.resetAll.bind(this);
    this.switchTab = this.switchTab.bind(this);
    this.errorModalRemove = this.errorModalRemove.bind(this);
  }

  searchBarHandler(event) {
    event.preventDefault();
    store.dispatch(searchUpdate(event.target.value));
    this.setState({ url: event.target.value });
  }
  errorModalRemove(event) {
    event.preventDefault();
    this.setState({ errorLoader: false });
  }

  switchTab(event) {
    event.preventDefault();
    store.dispatch(switchTab(event.target.id));
    this.setState({ currentPosition: { ch: 1, line: 1 } });
  }

  downloadZip(event) {
    event.preventDefault();
    store.dispatch(zipFiles(event.target.id));
  }

  resetTab(event) {
    event.preventDefault();
    store.dispatch(resetTab());
  }

  resetAll(event) {
    event.preventDefault();
    store.dispatch(resetAll());
  }

  connectionHandler(event) {
    event.preventDefault();
    this.setState({ modalLoader: true, modal: false });
    store.dispatch(currentSearch(event.target.id));
    let credentials = {
      url: this.state.url
    };
    // Checking if user requested demo databases
    if (event.target.id === "demo_database_mongo") {
      credentials.url =
        "mongodb://admin1:admin1@ds055485.mlab.com:55485/datacenter";
    }
    if (
      event.target.id === "demo_database_pg" ||
      credentials.url === "undefined"
    ) {
      let randomArr = ["postgres://tbpsxkue:TBTE6vwArK31H7dVlizemHoMn9LP_TWC@baasu.db.elephantsql.com:5432/tbpsxkue", "postgres://cwfmwiaw:AHwoqc41Cx3L7nMV5oSfz-KQZewSqQGx@baasu.db.elephantsql.com:5432/cwfmwiaw", "postgres://tbpsxkue:TBTE6vwArK31H7dVlizemHoMn9LP_TWC@baasu.db.elephantsql.com:5432/tbpsxkue"];
      randomArr[Math.floor(Math.random()*3)];
      credentials.url = randomArr[Math.floor(Math.random()*3)];;
    }
    // URL error-checking
    if (credentials.url === "") {
      this.setState({ placeholder: "Please input a valid database URL" });
      // Mongo URL check to trigger Mongo Server Routing
    } else if (credentials.url.includes("mongodb://")) {
      let mongoURL = `/db/mongo?url=${credentials.url}`;
      this.setState({ modalLoader: true, modal: false });
      fetch(mongoURL)
        .then(res => {
          return res.json();
        })
        .then(res => {
          if (res.name === "MongoNetworkError") {
                this.setState({ modalLoader: false, errorLoader: true, url: "" });
          }
          store.dispatch(saveData(res));
          this.setState({ modalLoader: false, url: "" });
        }).catch(err => {
          console.log(
            "connectionHandler error during initial database Fetch MONGO: ",
            err
          );
        });;
      // MySQL URL check to trigger MySQL Server Routing
    } else if (credentials.url.includes("mysql://")) {
      this.setState({ modalLoader: true, modal: false });
      let mysqlURL = `/db/mysql?url=${credentials.url}`;
      fetch(mysqlURL, {
        headers: { "Content-Type": "application/json; charset=utf-8" }
        //`mysql://root:test@localhost/tentaql`
      })
        .then(res => {
          return res.text();
        })
        .then(res => {
          if (res === "MYSQL Error"){
            this.setState({ modalLoader: false, errorLoader: true, url: "" });
            res = "";
            return res;
          }
          store.dispatch(saveData(res));
          this.setState({ modalLoader: false, url: "" });
        }).catch(err => {
          console.log(
            "connectionHandler error during initial database Fetch MYSQL: ",
            err
          );
        });
      // URI will default to trigger Postgres Server Routing
    } else if (credentials.url.includes("postgres://")) {
      this.setState({ modalLoader: true, modal: false });
      fetch("/db", {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: "POST",
        body: JSON.stringify(credentials)
      })
        .then(res => {
          this.setState({ persistedURL: this.state.url });
          fetch("/db/all")
            .then(res => {
              return res.json();
            })
            .then(res => {
              if (res.name == "error" || res.errno) {
                this.setState({ modalLoader: false, errorLoader: true, url: "" });
              }
              store.dispatch(saveData(res));
              this.setState({ modalLoader: false, url: "" });
            }).catch(err => {
              console.log(
                "connectionHandler error during initial database Fetch MYSQL: ",
                err
              );
            });
        })
        .catch(err => {
          console.log(
            "connectionHandler error during initial database Fetch: ",
            err
          );
        });
        // this.setState({ modalLoader: false, errorLoader: true, url: "" });
    } else {
      this.setState({ modalLoader: false, errorLoader: true, url: "" });
    }
  }

  render() {
    return (
      <Provider store={store}>
        <div>
          <div id="background-wrap">
            <img
              src="https://s3-us-west-2.amazonaws.com/svgporn.com/logos/graphql.svg"
              className="bubble x1"
            />
            <img
              src="https://s3-us-west-2.amazonaws.com/svgporn.com/logos/graphql.svg"
              className="bubble x2"
            />
            <img
              src="https://s3-us-west-2.amazonaws.com/svgporn.com/logos/graphql.svg"
              className="bubble x3"
            />
            <img
              src="https://s3-us-west-2.amazonaws.com/svgporn.com/logos/graphql.svg"
              className="bubble x4"
            />
            <img
              src="https://s3-us-west-2.amazonaws.com/svgporn.com/logos/graphql.svg"
              className="bubble x5"
            />
            <img
              src="https://s3-us-west-2.amazonaws.com/svgporn.com/logos/graphql.svg"
              className="bubble x6"
            />
            <img
              src="https://s3-us-west-2.amazonaws.com/svgporn.com/logos/graphql.svg"
              className="bubble x7"
            />
            <img
              src="https://s3-us-west-2.amazonaws.com/svgporn.com/logos/graphql.svg"
              className="bubble x8"
            />
            <img
              src="https://s3-us-west-2.amazonaws.com/svgporn.com/logos/graphql.svg"
              className="bubble x9"
            />
            <img
              src="https://s3-us-west-2.amazonaws.com/svgporn.com/logos/graphql.svg"
              className="bubble x10"
            />
          </div>
          <div>
          <ModalExampleDimmer
            data={this.state}
            connectionHandler={this.connectionHandler}
            searchBarHandler={this.searchBarHandler}
            placeholder={this.state.placeholder}
          />
          <ModalLoader
            data={this.state}
          />
          <ModalError
            data={this.state}
            errorModalRemove={this.errorModalRemove}
          />
          </div>
          <a href="https://github.com/TentaQL/tentaQL" target="blank">
            <img id="headerPic" src="https://i.ibb.co/LnSwJK1/Soft-Fill-Logo.png"/>
          </a>
          <TextBox
            className="textbox"
            downloadZip={this.downloadZip}
            resetTab={this.resetTab}
            switchTab={this.switchTab}
            resetAll={this.resetAll}
            searchBarHandler={this.searchBarHandler}
            connectionHandler={this.connectionHandler}
          />
        </div>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
