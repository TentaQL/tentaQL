import React, { Component } from "react";
import { Button, Header, Modal, Icon} from "semantic-ui-react";
import SVGInline from "react-svg-inline";
import {connect} from "react-redux";
import svgContent from "../boilerFunc/svg";

class ModalExampleDimmer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Modal open={this.props.data.modal}>
          <Modal.Header id="modalHeader">
          <div className="wrapper">
            <SVGInline svg={svgContent} />
          </div>
          <img id="octoLogo" src="../../Octopus.png"></img>
            <div id="text">Automatically Convert Legacy Databases to GraphQL</div>
          </Modal.Header>
          <Modal.Content id="modalContent">
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
          <Modal.Actions id="modalActions">
          <Button.Group>
          <Button animated='vertical' onClick={this.props.connectionHandler}>
          <Button.Content hidden><Icon name='database' />Postgres | Mongo</Button.Content>
          <Button.Content visible>
            Convert Your Database
          </Button.Content>
          </Button>
          <Button.Or text="or" />
          <Button animated='vertical' onClick={this.props.connectionHandler}>
          <Button.Content id='demo_database_pg' hidden><Icon name='database' />Postgres</Button.Content>
          
          <Button.Content visible>
            Try SQL Demo
          </Button.Content>
          </Button>
          <Button.Or text="or" />
          <Button id='demo_database_mongo' animated='vertical' onClick={this.props.connectionHandler}>
          <Button.Content id='demo_database_mongo' hidden><Icon name='database' />MongoDB</Button.Content>
          
          <Button.Content id='demo_database_mongo' visible>
            Try NoSQL Demo
          </Button.Content>
          </Button>
          </Button.Group>
          </Modal.Actions>
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

export default connect(mapStateToProps)(ModalExampleDimmer);


export { ModalExampleDimmer };


// labelPosition="right"
              // icon="checkmark"
              // content="Connect"