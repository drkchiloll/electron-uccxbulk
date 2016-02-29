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

        <div style={this._mainPanelStyle()}
             className='panel panel-primary'>
          <div style={this._mainBodStyle()}>
            <Navigation activeTab={this.state.activeTab}
                        onLogout={this._logout}
                        onSetTab={this._setTab.bind(this)}/>

            <div style={this._whichTab(tab, 'skills')}>
              <Skills loggedIn={this.state.loggedIn}/>
            </div>
            <div style={this._whichTab(tab, 'resources')}>
              <Resources loggedIn={this.state.loggedIn}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
  _setTab(activeTab) {
    this.setState({activeTab});
  }
  _mainPanelStyle() {
    return {
      display: this.state.loggedIn ? 'block': 'none'
    };
  }
  _mainBodStyle() {
    return {
      margin: '25px 0 0 0'
    };
  }
  _whichTab(actab, tab) {
    switch(actab) {
      case 'skills':
      case 'resources':
        return {
          display: tab===actab ? 'block' : 'none'
        };
    }
  }
}
