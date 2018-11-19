const React = require("react");
const ReactDOM = require("react-dom");
import { connect } from 'react-redux';
import { Button, Header, Modal, Icon} from "semantic-ui-react";
import { Component } from "react";
import { UnControlled as CodeMirror } from "react-codemirror2";
import { codeMirrorUpdate } from '../actions/textBoxActions';
// import { Tab } from 'semantic-ui-react'
import { TabProvider, Tab, TabPanel, TabList } from 'react-web-tabs';
import Clipboard from "react-clipboard.js";

import "codemirror/addon/hint/show-hint";
import "codemirror/addon/lint/lint";
import "codemirror-graphql/hint";
import "codemirror-graphql/lint";
import "codemirror-graphql/mode";

class TextBox extends Component {
  render() {
   
    return (
      <div id="textContainer">
        <Clipboard
          className="clipboard"
          component="a"
          button-href="#"
          data-clipboard-text={this.props.currentSchema}
        >
 <Button animated>
      <Button.Content visible>Copy Tab</Button.Content>
      <Button.Content hidden>
        <Icon name='copy outline' />
      </Button.Content>
    </Button>
        {/* <Button><Icon name="copy outline" />Copy to Clipboard</Button> */}
        </Clipboard>


        <TabProvider defaultTab="one">
        <section className="my-tabs">

          <TabList className="my-tablist">
          <Button.Group className="buttonColl">
           <Button className="wrapperButton"><Tab className="tab" id="tab_1" tabFor="one">Schema</Tab></Button>
           <Button.Or text='</>' />
           <Button className="wrapperButton"><Tab className="tab" tabFor="two">Resolvers</Tab></Button>
           <Button.Or text='</>' />
           <Button className="wrapperButton"><Tab className="tab" tabFor="three">OtherFiles</Tab></Button>
           <Button.Or text='</>' />
           <Button onClick={this.props.downloadZip} className="wrapperButton" animated='fade'>
              <Button.Content visible>&nbsp;&nbsp;&nbsp;&nbsp;Original Zip</Button.Content>
              <Button.Content hidden><Icon onClick={this.props.downloadZip} id="Original" name="download" /></Button.Content>
            </Button>
            <Button.Or text='</>' />
           <Button id="Edited" className="wrapperButton" animated='fade'>
              <Button.Content visible>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Edited Zip</Button.Content>
              <Button.Content onClick={this.props.downloadZip} id="Updates" hidden>You sure?</Button.Content>
            </Button>
            <Button.Or text='</>' />
           <Button id="Reset" className="wrapperButton" animated='fade'>
              <Button.Content visible>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Reset Tab</Button.Content>
              <Button.Content id="Original" hidden><Icon id="TabReset" name="redo" /></Button.Content>
            </Button>
            <Button.Or text='</>' />
           <Button id="ResetAll" className="wrapperButton" animated='fade'>
              <Button.Content visible>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Reset All</Button.Content>
              <Button.Content id="Original" hidden><Icon id="AllReset" name="history" /></Button.Content>
            </Button>
            
           </Button.Group>
          </TabList>
          <div className="wrapper">
            <TabPanel tabId="one">
            <CodeMirror
          className="codeeditor"
          id="schemaTab"
          value={this.props.codeMirrorLambda}
          options={{
            // mode: 'javascript',
            lineSeparator: `λ`,
            lineWrapping: false,
            lineNumbers: true,
            readOnly: false
          }}
          onChange={(editor, metadata, value) => {
            this.props.dispatch(codeMirrorUpdate(value, "schemaTab"));
          }}
        />
            </TabPanel>
            <TabPanel tabId="two">
            <CodeMirror
          className="codeeditor"
          id="resolversTab"
          value={this.props.resolversLambda}
          options={{
            // mode: 'javascript',
            lineSeparator: `λ`,
            lineWrapping: false,
            lineNumbers: true,
            readOnly: false
          }}
          onChange={(editor, metadata, value) => {
            this.props.dispatch(codeMirrorUpdate(value, "resolversTab"));
          }}
          onClick={(editor, metadata, value) => {
            this.editor.value = this.props.resolversLambda;
          }}
        />
            </TabPanel>
            <TabPanel tabId="three">
              <p>More Files To Come!</p>
            </TabPanel>
          </div>
        </section>
      </TabProvider>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {  currentSchema: state.currentSchema,
            codeMirrorLambda: state.codeMirrorLambda,
            currentResolvers: state.currentResolvers,
            resolversLambda: state.resolversLambda };
};

export default connect(mapStateToProps)(TextBox);
