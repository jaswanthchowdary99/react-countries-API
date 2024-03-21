import React from 'react'
import Toggle from './Toggle';

function Header() {
  return (
 
    <div className='head'>
    <header>
      <div className='headContent'>
      <div className="header-content">
        <h1>Where in the world?</h1>
      </div>
      <div className='darkmode'>
        <Toggle />
        </div>
      </div>
    </header>
  </div>
);
}

export default Header