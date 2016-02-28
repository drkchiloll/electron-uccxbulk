import React from 'react';
import Login from './Login';
import Navigation from './Navigation';
import Resources from './Resources';
import Skills from './Skills';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      activeTab: 'skills',
      creds: {},
      message: null,
      loggedIn: false
    };
    this.login = this.login.bind(this);
    this._logout = this._logout.bind(this);
  }
  login() {
    loggedIn.on('loggedIn', (stats) => {
      this.setState({loggedIn: true});
    });
    loggedIn.on('loginError', (status) => {
      this.setState({message: status});
    })
  }
  _logout() {
    uccx = null;
    this.setState({loggedIn: false});
  }
  render() {
    var tab = this.state.activeTab;
    return (
      <div>
        <Login login={this.login}
               loggedIn={this.state.loggedIn}
               message={this.state.message}/>

        <div style={{display: this.state.loggedIn ? 'block': 'none'}}
             className='panel panel-primary'>
          <Navigation activeTab={this.state.activeTab}
                      onLogout={this._logout}
                      onSetTab={this._setTab.bind(this)}/>

          <div style={{
            display: tab==='skills' ? 'block' : 'none',
            margin: '20px 20px 20px 20px'
          }}>
            <Skills loggedIn={this.state.loggedIn}/>
          </div>
          <div style={{
            display: tab==='resources' ? 'block' : 'none',
            margin: '20px 20px 20px 20px'
          }}>
            <Resources loggedIn={this.state.loggedIn}/>
          </div>
        </div>
      </div>
    );
  }
  _setTab(activeTab) {
    this.setState({activeTab});
  }
}
