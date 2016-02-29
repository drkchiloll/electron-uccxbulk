import React from 'react';

export default class Navigation extends React.Component {
  render() {
    var activeTab = this.props.activeTab;
    return (
      <div className='col-sm-offset-1 col-sm-2'>
        <ul className='nav nav-pills nav-stacked'>
          <li role='presentation'
              className={activeTab==='logout' ? 'active' : ''}>
            <a id='logout'
               onClick={this.props.onLogout}>
               <span className='glyphicon glyphicon-log-out'
                     style={{color: 'red', fontSize: '1.2em'}}></span>
            </a>
          </li>
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
      </div>
    );
  }
  _setTab(e) {
    this.props.onSetTab(e.target.id);
  }
}
