const React = require("react");
const ReactDOM = require("react-dom");
import {Component} from "react";
import {Button, Icon, Input, Checkbox, Form, Menu, Sticky} from "semantic-ui-react";

class Navbar extends Component{

  render() {
      return (
        <Sticky>
        <Menu>
          <Menu.Item position='left'>
            <Input action={{ type: 'submit', content: 'Convert' }} placeholder='Enter a Database URL ...' />
          </Menu.Item>
          <Menu.Item position='left'>
            <h1>TentaQL</h1>
          </Menu.Item>
          <Menu.Item position='left'>
            <Button>TentaQL</Button>
          </Menu.Item>
          <Menu.Item position='left'>
          <Button size='small' color='green'>
              <Icon name='download' />
              Download
            </Button>
            </Menu.Item>
        </Menu>
        </Sticky>
      )
  }

}

export default Navbar;

