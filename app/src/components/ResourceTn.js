import React from 'react';

export default class ResourceTn extends React.Component {
  render() {
    var agent = this.props.agent,
        userID = agent.userID,
        idx = this.props.index,
        expand = `glyphicon glyphicon-${!agent.expand ? 'expand' : 'collapse-down'}`;
    return (
      <div key={idx} className='col-sm-7'>
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
    var actAgent = this.props.agentSelectSkill;
    return (
      <div style={{
            display: (!agent.expand) ? 'none' : 'block',
            marginTop: '10px'
           }}
           className="thumbnail">
        <div className="caption">
          <p>{agent.firstName} {agent.lastName}</p>
          <hr/>
          <ul className='nav nav-pills'>
            <li role='presentation'>
              <button id={agent.userID}
                      onClick={this._setActive.bind(this)}
                      className={`btn btn-xs btn-${actAgent===agent.userID ? 'primary' : 'link'}`}>
                Skills Map
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
  _setActive(e) {
    this.props.setAgentSkill(e.target.id);
  }
}
