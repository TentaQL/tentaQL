const React = require("react");
const ReactDOM = require("react-dom");
import { Component } from "react";
import { connect } from 'react-redux';
import {
  Button,
  Icon,
  Input,
  Menu,
  Sticky
} from "semantic-ui-react";

class Navbar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Sticky>
        <Menu>
          <Menu.Item position="left">
            <Input
              onChange={this.props.searchBarHandler}
              value={this.props.url}
              id="navbar"
              placeholder="To setup additional databases, please enter the URL ..."
            />
            <Button onClick={this.props.connectionHandler}>Connect</Button>
          </Menu.Item>
          <Menu.Item position="left">
            <h1>TentaQL</h1>
          </Menu.Item>
          <Menu.Item position="left">
          <Button size="small" color="green">
              <Icon name="download" />
             Test Store
            </Button>
            <Button onClick={this.props.downloadZip} size="small" color="green">
              <Icon name="download" />
              Download Your TentaQL 
            </Button>
          </Menu.Item>
        </Menu>
      </Sticky>
    );
  }
}

export default Navbar;
