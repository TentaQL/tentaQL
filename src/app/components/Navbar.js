const React = require("react");
import { Component } from "react";
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
        <Menu>
          <Menu.Item position="left">
            <Input
              onChange={this.props.searchBarHandler}
              value={this.props.url}
              id="navbar"
              placeholder="To setup additional databases, please enter the URL ..."
            />
            <Button animated='fade'>
              <Button.Content visible>Connect</Button.Content>
              <Button.Content hidden><Icon id="newURL" name="database" onClick={this.props.connectionHandler} /></Button.Content>
            </Button>
          </Menu.Item>
          <a href="https://github.com/TentaQL/tentaQL"><img id="mascot" src="../../../OctopusCircle.png" target="_blank"></img></a>
          <Menu.Item position="right">
            <h1>TentaQL</h1>
          </Menu.Item>
          </Menu>
    );
  }
}

export default Navbar;
