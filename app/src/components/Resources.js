import React from 'react';
import ResourceTn from './ResourceTn';

export default class Resources extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resources: null,
      tns: null
    };
    this._renderAgents = this._renderAgents.bind(this);
  }
  componentDidUpdate(newProps, newState) {
    if(this.props.loggedIn) {
      if(this.props.resources.length === 0) {
        uccx.listRsrc().then(rsrcs => {
          //set an expand property on the resources
          var resources = rsrcs.resource.map(rsrc => {
            rsrc.expand = false;
            return rsrc;
          });
          this.props.onRsrcs(resources);
          this.setState({resources: resources});
        }).catch(err => console.log(err));
      }
    }
  }
  render() {
    var agentTN;
    if(this.state.resources) {
      agentTN = this.state.resources;
    }
    return (
      <div className="row col-sm-offset-3">
        {agentTN ? this._renderAgents(agentTN) : <div></div>}
      </div>
    );
  }
  _renderAgents(agents) {
    return agents.map((agent, idx) => {
      return (
        <ResourceTn key={idx}
                    index={idx}
                    agent={agent}
                    onExpand={this._expand.bind(this)}/>
      );
    });
  }
  _expand(agent, index) {
    var resources = this.state.resources;
    resources[index] = agent;
    this.setState({resources : resources});
  }
}
