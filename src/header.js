import React from 'react'
import Toggle from './toggle';

function Header() {
  return (
 
    <div className='head'>
    <header>
      <div className="header-content">
        <h1>Where in the world?</h1>
        <Toggle />
      </div>
    </header>
  </div>
);
}

export default Header