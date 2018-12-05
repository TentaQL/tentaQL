import React, { Component } from "react";
import { Modal } from "semantic-ui-react";
import { connect } from "react-redux";

class ModalError extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <Modal onClick={this.props.errorModalRemove} size="mini" closeIcon open={this.props.data.errorLoader}>
          <Modal.Header id="modal_ErrorHeader">

            <img id="octoLogo" src="https://i.ibb.co/0K7fV9S/Octopus.png" />
            <div id="loadingText">
              We're having trouble wrapping our TentaQLs around this one ... try again!
            </div>
          </Modal.Header>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    url: state.search_url
  };
};

export default connect(mapStateToProps)(ModalError);

export { ModalError };
