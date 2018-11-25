import React, { Component } from "react";
import { Button, Header, Modal, Icon } from "semantic-ui-react";

class ModalExampleDimmer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Modal open={this.props.data.modal}>
          <Modal.Header color="blue">Welcome to TentaQL</Modal.Header>
          <Modal.Content>
            <form className="ui form">
              <div className="field">
                <label>PostgreSQL URL</label>
                <input
                  type="text"
                  name="url"
                  id="modal"
                  placeholder={this.props.data.placeholder}
                  style={this.props.placeholderColor}
                  value={this.props.data.url}
                  onChange={this.props.searchBarHandler}
                />
              </div>
            </form>
          </Modal.Content>
          <Modal.Actions>
            <Button animated="vertical" onClick={this.props.connectionHandler}>
              <Button.Content hidden>
                <Icon name="database" />
              </Button.Content>
              <Button.Content visible>PostgreSQL</Button.Content>
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export { ModalExampleDimmer };
