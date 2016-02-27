import React from 'react';

export default class Skills extends React.Component {
  constructor() {
    super();
    this.state = {
      skills: null,
      skillData: null,
      skill: null
    };
  }
  _renderSkillTable() {
    var skillData;
    uccx.skill({method: 'GET'}).then(skills => {
      skillData = skills.skill.map(skill => {
        return (
          <tr key={skill.skillId}>
            <td>{skill.skillName}</td>
            <td className='col-sm-2'>
              <button className='btn btn-md btn-link glyphicon glyphicon-trash'
                    style={{color: 'red'}}
                    onClick={this._deleteSkill.bind(this)}
                    id={skill.self}>
              </button>
            </td>
          </tr>
        );
      });
      skillData.push(this._skillButton());
      this.setState({
        skills: skills.skill,
        skillData: skillData
      });
    })
  }
  render() {
    return (
      <div className='row'>
        <div className='col-sm-offset-3 col-sm-6'>
          <table className='table table-bordered'>
            <thead>
              <tr><th>SkillName</th><th></th></tr>
            </thead>
            <tbody>
              {this.state.skillData}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  componentDidUpdate(prevProps, prevState) {
    if(this.props.loggedIn) {
      if(!this.state.skills) {
        this._renderSkillTable();
      }
    }
  }
  _addInput() {
    var input;
    var skillData = this.state.skillData;
    var len = skillData.length - 1;
    input = (
      <tr key={'addskill'}>
        <td>
          <input autoFocus
                 type='text'
                 onChange={this._setSkill.bind(this)}/>
        </td>
        <td>
          <button className='btn btn-xs btn-link glyphicon glyphicon-plus'
                  style={{color: 'green'}}
                  onClick={this._addSkill.bind(this)}>
          </button>
          <button className='btn btn-xs btn-link glyphicon glyphicon-alert'
                  style={{color: 'red'}}
                  onClick={this._resetCell.bind(this)}>
          </button>
        </td>
      </tr>
    );
    skillData[len] = input;
    skillData.push(this._skillButton(1))
    this.setState({
      skillData: this.state.skillData
    });
  }
  _addSkill() {
    uccx.skill({
      method: 'POST',
      skill: this.state.skill
    }).then((newSkill) => {
      this._renderSkillTable();
    })
  }
  _setSkill(e) {
    this.setState({skill: e.target.value});
  }
  _deleteSkill(e) {
    uccx.request({method: 'DELETE', uri: e.target.id}).then(resp => {
      this._renderSkillTable();
    });
  }
  _skillButton(idx) {
    return (
      <tr key={'nextskill' + idx}
          onClick={this._addInput.bind(this)}>
        <td><button className='btn btn-xs btn-block'>Add Skill</button></td>
        <td></td>
      </tr>
    );
  }
  _resetCell() {
    var skillData = this.state.skillData;
    var len = skillData.length - 2;
    skillData[len] = this._skillButton(2);
    skillData.pop();
    this.setState({skillData: skillData});
  }
}
