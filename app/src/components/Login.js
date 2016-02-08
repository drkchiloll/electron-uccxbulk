import React from 'react';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      server: null,
      username: null,
      password: null
    };
    this.handleLogin = this.handleLogin.bind(this);
  }
  handleLogin() {
    console.log(this.refs.ip.value);
  }
  render() {
    var displayLogin = this.dispLogin();
    var dcreds = {
      s: '', u: '', p: ''
    };
    return (
      <div style={displayLogin} className='panel panel-primary'>
        <div
          style={{margin: '20px 20px 20px 20px'}}
          className='form-horizontal'>
          <h4> UCCX Login </h4>
          <div className='form-group'>
            <label className='col-sm-2 control-label'> Server: </label>
            <div className='col-sm-10'>
              <input ref='ip' type='text' className='form-control' placeholder='Server IP'/>
            </div>
          </div>
          <div className='form-group'>
            <label className='col-sm-2 control-label'> UserId: </label>
            <div className='col-sm-10'>
              <input type='text' className='form-control' placeholder='User Id'/>
            </div>
          </div>
          <div className='form-group'>
            <label className='col-sm-2 control-label'> Password: </label>
            <div className='col-sm-10'>
              <input type='password' className='form-control' placeholder='Password'/>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-sm-offset-2 col-sm-10'>
              <button
                className='btn btn-sm btn-primary'
                onClick={this.handleLogin}>
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  dispLogin() {
    return {
      display: (this.props.loggedIn) ? 'none': 'block',
      margin: '20px 20px 20px 20px'
    };
  }
}
