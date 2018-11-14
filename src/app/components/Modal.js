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
                <label>User Name</label>
                <input
                  type="text"
                  name="user"
                  placeholder="User Name..."
                  value={this.props.data.user}
                  onChange={this.props.credentialsHandler}
                />
              </div>
              <div className="field">
                <label>Password</label>
                <input
                  type="text"
                  name="password"
                  placeholder="Password..."
                  value={this.props.data.password}
                  onChange={this.props.credentialsHandler}
                />
              </div>
              <div className="field">
                <label>Host</label>
                <input
                  type="text"
                  name="host"
                  placeholder="Host..."
                  value={this.props.data.host}
                  onChange={this.props.credentialsHandler}
                />
              </div>
              <div className="field">
                <label>Port</label>
                <input
                  type="text"
                  name="port"
                  placeholder="Port..."
                  value={this.props.data.port}
                  onChange={this.props.credentialsHandler}
                />
              </div>
              <div className="field">
                <label>Database Name</label>
                <input
                  type="text"
                  name="dbName"
                  placeholder="Database Name..."
                  value={this.props.data.dbName}
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
