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
  render() {
    return (
      <div className='row'>
        <div className='col-sm-6'>
          <table className='table table-bordered'>
            <thead>
              <tr><th>Name</th><th></th></tr>
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
    var skillData;
    if(this.props.loggedIn) {
      if(!this.state.skills) {
        uccx.skill({method: 'GET'}).then(skills => {
          skillData = skills.skill.map(skill => {
            return (
              <tr key={skill.skillId}>
                <td>{skill.skillName}</td>
                <td></td>
              </tr>
            );
          });
          skillData.push(
            <tr key={'nextskill'}
                onClick={this._addInput.bind(this)}>
              <td><button className='btn btn-xs btn-block'>Add Skill</button></td>
              <td></td>
            </tr>
          );
          this.setState({
            skills: skills.skill,
            skillData: skillData
          });
        });
      }
    }
  }
  _addInput() {
    var len = this.state.skillData.length - 1;
    var input = this.state.skillData[len];
    input = (
      <tr key={'nextskill'}>
        <td><input type='text' onChange={this._setSkill.bind(this)}/></td>
        <td>
          <button className='btn btn-xs btn-block'
                  onClick={this._addSkill.bind(this)}>
            Add
          </button>
        </td>
      </tr>
    );
    this.state.skillData[len] = input;
    this.setState({
      skillData: this.state.skillData
    });
  }
  _addSkill() {
    uccx.skill({
      method: 'POST',
      skill: this.state.skill
    }).then((newSkill) => {
      console.log(newSkill);
    })
  }
  _setSkill(e) {
    this.setState({skill: e.target.value});
  }
}
