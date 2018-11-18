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
          <Modal.Header color="blue">Welcome to TentaQL</Modal.Header>
          <Modal.Content>
            <form className="ui form">
              <div className="field">
                <label>Database URL</label>
                <input
                  type="text"
                  name="url"
                  id="modal"
                  placeholder={this.props.placeholder}
                  style = {this.props.placeholderColor}
                  value={this.props.data.url}
                  onChange={this.props.searchBarHandler}
                />
              </div>
            </form>
          </Modal.Content>
          <Modal.Actions>
            <button className = "medium ui green button"
              onClick={this.props.connectionHandler}
              positive>Connect</button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export { ModalExampleDimmer };


// labelPosition="right"
              // icon="checkmark"
              // content="Connect"