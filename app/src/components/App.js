import React from 'react';
import Login from './Login';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      creds: {},
      message: null,
      loggedIn: false
    };
    this.login = this.login.bind(this);
  }
  login() {
    loggedIn.on('loggedIn', (stats) => {
      this.setState({loggedIn: true});
    });
    loggedIn.on('loginError', (status) => {
      this.setState({message: status});
    })
  }
  render() {
    return (
      <div>
        <Login
          login={this.login}
          loggedIn={this.state.loggedIn}
          message={this.state.message}/>
        {/* Other Stuff Here */}
        <div
          style={{display: this.state.loggedIn ? 'block': 'none'}}
          className='panel panel-primary'>
          <div style={{margin: '20px 20px 20px 20px'}}>
            New Stuff Here
          </div>
        </div>
      </div>
    );
  }
}
