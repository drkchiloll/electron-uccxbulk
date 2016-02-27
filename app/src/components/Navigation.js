import React from 'react';

export default class Navigation extends React.Component {
  render() {
    var activeTab = this.props.activeTab;
    return (
      <ul className='nav nav-tabs'>
        <li role='presentation'
            className={activeTab==='skills' ? 'active' : ''}>
          <a id='skills'
             onClick={this._setTab.bind(this)}>Skills</a>
        </li>
        <li role='presentation'
            className={activeTab==='resources' ? 'active' : ''}>
          <a id='resources'
             onClick={this._setTab.bind(this)}>Resources</a>
        </li>
      </ul>
    );
  }
  _setTab(e) {
    this.props.onSetTab(e.target.id);
  }
}
