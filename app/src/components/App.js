import React from 'react';
import Login from './Login';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      creds: {},
      loggedIn: false
    };
  }
  login() {
    // Not sure Yet
    // Probably something along the lines of GET AgentStats
  }
  render() {
    return (
      <div>
        <Login login={this.login} loggedIn={this.state.loggedIn}/>
        {/* Other Stuff Here */}
      </div>
    );
  }
}
