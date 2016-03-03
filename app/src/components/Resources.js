import React from 'react';
import ResourceTn from './ResourceTn';

export default class Resources extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resources: null,
      selectedAgents: null,
      selectedSkills: [],
      agentToSkills: null,
      skillGrid: <div></div>,
    };
    this._renderAgents = this._renderAgents.bind(this);
    this._renderSkillsList = this._renderSkillsList.bind(this);
  }
  componentDidMount() {
    skillEvt.on('skillsList', skills => {
      this._renderSkillsList(skills);
    });
  }
  componentDidUpdate(newProps, newState) {
    if(this.props.loggedIn) {
      if(this.props.resources.length === 0) {
        uccx.listRsrc().then(rsrcs => {
          //set an expand property on the resources
          var resources = rsrcs.resource.map(rsrc => {
            rsrc.expand = false;
            rsrc.skillsToAdd = [];
            return rsrc;
          });
          this.props.onRsrcs(resources);
          this.setState({resources: resources});
        }).catch(err => console.log(err));
      }
    }
    console.log(this.state.agentToSkills);
  }
  render() {
    var agentTN;
    if(this.state.resources) {
      agentTN = this.state.resources;
    }
    return (
      <div className='row'>
        <div className='col-sm-offset-3'>
          {agentTN ? this._renderAgents(agentTN) : <div></div>}
        </div>
        <div className='col-sm-offset-8'>
          {this.state.skillGrid}
        </div>
      </div>
    );
  }
  _renderAgents(agents) {
    return agents.map((agent, idx) => {
      return (
        <ResourceTn key={idx}
                    index={idx}
                    agent={agent}
                    setAgentSkill={this._setAgentSel.bind(this)}
                    selectedAgents={this.state.selectedAgents}
                    onExpand={this._expand.bind(this)}/>
      );
    });
  }
  _expand(agent, index) {
    var resources = this.state.resources;
    resources[index] = agent;
    this.setState({resources : resources});
  }
  _setAgentSel(userId) {
    this.setState({selectedAgents: userId});
  }
  _renderSkillsList(ccxSkills) {
    ccxSkills.push(undefined);
    var skillTxtArea = (
      <div style={{
          border: '1px solid grey',
          margin: '0 35px 0 35px'
        }}>
        <h5 style={{marginLeft: '10px'}}>UCCX Skills</h5>
        <div className='form-horizontal'>
          {ccxSkills.map((skill, i) => {
            if(skill) {
              return (
                <div key={i}
                  style={{border:'none'}}
                  className='form-control'>
                  <button
                    id={skill}
                    style={{outline: '0'}}
                    onClick={this._setSelSkill.bind(this)}
                    className='btn btn-sm btn-link'>
                    {skill}
                  </button>
                </div>
              )
            } else {
              return (
                <div key={i} style={{border:'none'}} className='form-control'>
                  <button className='btn btn-xs btn-block'
                    onClick={this._pushSkillsToAgents.bind(this)}>
                    <span className='glyphicon glyphicon-chevron-left'></span>
                    <span className='glyphicon glyphicon-chevron-left'></span>
                    <span className='glyphicon glyphicon-chevron-left'></span>
                  </button>
                </div>
              );
            }
          })}
        </div>
      </div>
    );
    this.setState({skillGrid: skillTxtArea});
  }
  _setSelSkill(e) {
    var selSkills = this.state.selectedSkills;
    var skillSelBtn = e.target,
        skill = skillSelBtn.id;
    var elemClass = skillSelBtn.getAttribute('class');
    if(elemClass.includes('btn-primary')) {
      var index = selSkills.findIndex(selSkill => skill === selSkill);
      selSkills.splice(index, 1);
      // console.log(selSkills);
      skillSelBtn.setAttribute('class', 'btn btn-sm btn-link');
      this.setState({selectedSkills: selSkills});
    } else {
      selSkills.push(skill);
      skillSelBtn.setAttribute('class', 'btn btn-sm btn-primary');
      this.setState({selectedSkills: selSkills});
    }
  }
  _pushSkillsToAgents() {
    var selectedSkills = this.state.selectedSkills,
        selectedAgents = this.state.selectedAgents,
        resources = this.state.resources;
    var rsrcIndex=resources.findIndex(resrc => resrc.userID===selectedAgents);
    var rsrc = resources[rsrcIndex];
    selectedSkills.forEach(skill => {
      rsrc.skillsToAdd.push(skill);
    });
    resources[rsrcIndex] = rsrc;
    this.props.onRsrcs(resources);
  }
}
