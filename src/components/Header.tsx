import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SyncAltIcon from '@mui/icons-material/SyncAlt';

const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" startIcon={<WalletIcon />} onClick={() => {console.log('Button Pressed');
        }}>
          <Typography>CompanyName</Typography>
        </Button>
        <div style={{ flexGrow: 1 }}></div>
        <Button color="inherit" endIcon={<SyncAltIcon />}>
          Synced
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
