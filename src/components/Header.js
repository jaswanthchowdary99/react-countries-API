
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import Toggle from './Toggle';

function Header({ toggleDarkMode, isDarkMode }) {
  return (
    <AppBar position="static" style={{ backgroundColor: isDarkMode ? 'rgb(32,44,54)' : 'inherit' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 8 }} style={{ color: isDarkMode ? 'white' : 'black' }}>
          <h3>Where in the world?</h3>
        </Typography>
        <Toggle toggleDarkMode={toggleDarkMode} />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
