import React, { Component } from "react";
import { Modal } from "semantic-ui-react";
import { connect } from "react-redux";

class ModalLoader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Modal size="mini" open={this.props.data.modalLoader}>
          <Modal.Header id="modal_LoadingHeader">

            <img id="octoLogo" src="https://i.ibb.co/0K7fV9S/Octopus.png" />
            <div id="loadingText">
              Loading ... 
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

export default connect(mapStateToProps)(ModalLoader);

export { ModalLoader };
