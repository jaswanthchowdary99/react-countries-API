import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon} from '@fortawesome/free-solid-svg-icons'; 

function Toggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);

    const root = document.querySelector(':root');
    if (isDarkMode) {
      root.classList.remove('dark-mode');
    } else {
      root.classList.add('dark-mode');
    }

  };

  return (
    <button className={`toggle-button ${isDarkMode ? 'dark' : 'light'}`} onClick={toggleDarkMode}>
      <FontAwesomeIcon icon={faMoon} className='icon'/>
      <span>Dark Mode</span>
    </button>
  );
}


export default Toggle;
