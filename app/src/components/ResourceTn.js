import React from 'react';

export default class ResourceTn extends React.Component {
  render() {
    var agent = this.props.agent,
        userID = agent.userID,
        idx = this.props.index,
        expand = `glyphicon glyphicon-${!agent.expand ? 'expand' : 'collapse-down'}`;
    return (
      <div key={idx} className="col-sm-5">
        <div className="thumbnail">
          <div className="caption">
            <p style={{color: 'blue'}}>{userID}</p>
            <div id={userID}>
              <a onClick={this._viewDetails.bind(this, agent, idx)}>
                <span style={{marginRight: '5px', fontSize: '1.1em'}}
                      className={expand}/>
                view details
              </a>
              {this._agentDetails(agent)}
            </div>
          </div>
        </div>
      </div>
    );
  }
  _viewDetails(agent, idx) {
    if(agent) {
      agent.expand = !agent.expand;
      this.props.onExpand(agent, idx);
    }
  }
  _agentDetails(agent) {
    return (
      <div style={{display: (!agent.expand) ? 'none' : 'block'}}
           className="thumbnail">
        <div className="caption">
          <p>{agent.firstName} {agent.lastName}</p>
          <p>Skills Map</p>
          <p>...</p>
        </div>
      </div>
    );
  }
}
