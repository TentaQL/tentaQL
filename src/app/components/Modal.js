import React, { Component } from "react";
import { Button, Header, Modal } from "semantic-ui-react";

class ModalExampleDimmer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Modal open={this.props.data.modal}>
          <Modal.Header>Welcome to TentaQL</Modal.Header>
          <Modal.Content>
            <form className="ui form">
              <div className="field">
                <label>Database URL</label>
                <input
                  type="text"
                  name="url"
                  placeholder="Database url."
                  value={this.props.data.url}
                  onChange={this.props.credentialsHandler}
                />
              </div>
            </form>
          </Modal.Content>
          <Modal.Actions>
            <Button
              onClick={this.props.connectionHandler}
              positive
              labelPosition="right"
              icon="checkmark"
              content="Connect"
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export { ModalExampleDimmer };
