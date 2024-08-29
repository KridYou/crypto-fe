import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import Link from 'next/link';

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  textTransform: 'none',
}));

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My Crypto Tracker
        </Typography>
        <Link href="/" passHref>
          <StyledButton>Home</StyledButton>
        </Link>
        <Link href="/register" passHref>
          <StyledButton>Register</StyledButton>
        </Link>
        <Link href="/portfolio" passHref>
          <StyledButton>Portfolio</StyledButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
