import React from 'react';
import { AppBar, Toolbar, Typography, Button} from '@mui/material';
import DiamondIcon from '@mui/icons-material/Diamond';
import SyncIcon from '@mui/icons-material/Sync';


const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" style={{textTransform: 'none'}} startIcon={<DiamondIcon />} onClick={() => {console.log('Button Pressed');
        }}>
          <Typography>cySync</Typography>
        </Button>
        <div style={{ flexGrow: 1 }}></div>
        <Button color="inherit" style={{textTransform: 'none'}} endIcon={< SyncIcon/>}>
          Synced
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
