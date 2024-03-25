
import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'; 

function Toggle({ toggleDarkMode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
    toggleDarkMode(!isDarkMode);
  };

  return (
    <Button
      variant="Text"
      color="inherit"
      onClick={handleToggle}
      startIcon={<FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />}
      sx={{ textTransform: 'none', mr: 9, color: isDarkMode ? 'white' : 'black' }}
    >
      <Typography variant="button" sx={{ mr: 1 }}>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</Typography>
    </Button>
  );
}

export default Toggle;
