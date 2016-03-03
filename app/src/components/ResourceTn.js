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
    var actAgent = this.props.selectedAgents;
    var agentId = agent.userID;
    var agntSkill, skillsToAdd, skill;
    if(agent.skillMap.skillCompetency) {
      skill = agent.skillMap.skillCompetency;
      if(agent.skillsToAdd) {
        skillsToAdd = agent.skillsToAdd;
      }
      agntSkill = this._renderAgentSkillTable(agentId, skill, skillsToAdd);
    } else {
      if(agent.skillsToAdd) {
        skillsToAdd = agent.skillsToAdd;
      }
      agntSkill = this._renderAgentSkillTable(agentId, null, skillsToAdd);
    }
    return (
      <div style={{
            display: (!agent.expand) ? 'none' : 'block',
            marginTop: '10px'
           }}
           className="thumbnail">
        <div className="caption">
          <p>{agent.firstName} {agent.lastName}</p>
          <button id={agent.userID}
                  onClick={this._setActive.bind(this)}
                  className={`btn btn-${actAgent===agent.userID ? 'primary btn-sm' : 'link btn-md'}`}>
            Skills Map
          </button>
          {agntSkill}
        </div>
      </div>
    );
  }
  _setActive(e) {
    this.props.setAgentSkill(e.target.id);
  }
  _renderAgentSkillTable(id, agntSkill, skillsToAdd) {
    var genList = [1,2,3,4,5,6,7,8,9,10];
    var len;
    if(!agntSkill) len = 0;
    else len = agntSkill.length + 10;
    return (
      <table className={`${id} table`}>
        <thead>
          <tr><th>SkillName</th><th>Skill Value</th></tr>
        </thead>
        <tbody>
          {agntSkill ? this._agntSkills(agntSkill) : undefined}
          {skillsToAdd
            ? this._agntSkillsToAdd(skillsToAdd, len, genList)
            : <tr></tr>
          }
        </tbody>
      </table>
    );
  }
  _agntSkills(agntSkill) {
    return agntSkill.map((skill, i) => {
      var skillname = skill.skillNameUriPair['@name'];
      var comp = skill.competencelevel;
      return (
        <tr key={i}>
          <td>{skillname==='placeholder' ? undefined : skillname}</td>
          <td>{comp}</td>
        </tr>
      );
    });
  }
  _agntSkillsToAdd(skills, len, genList) {
    return skills.map((skill, i) => {
      return (
        <tr key={len + i}>
          <td style={{color:'red'}}>{skill}</td>
          <td>
            <select>{genList.map((num, i) => {
              return <option key={i}>{num}</option>;
              })}
            </select>
          </td>
        </tr>
      )
    });
  }
}
