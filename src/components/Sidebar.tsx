// @ts-nocheck
import React, { useState } from 'react';
import { Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
interface SidebarProps {
  selectedSidebarItem: string;
  setSelectedSidebarItem: React.Dispatch<React.SetStateAction<string>>;
}
const Sidebar: React.FC<SidebarProps> = ({selectedSidebarItem, setSelectedSidebarItem}) => {

  const handleItemClick = (item: string) => {
    setSelectedSidebarItem(item);
  };
  
  return (
    <div>
      <List>
        <ListItem
          style={{ color: selectedSidebarItem === 'wallets' ? '#C78D4E' : 'inherit' }}
          onClick={() => handleItemClick('wallets')}
        >
          <ListItemIcon><WalletIcon style={{ color: selectedSidebarItem === 'wallets' ? '#C78D4E' : '#FFFFFF' }} /></ListItemIcon>
          <ListItemText primary="Wallets" />
        </ListItem>
        <ListItem
          style={{ color: selectedSidebarItem === 'transactions' ? '#C78D4E' : 'inherit' }}
          onClick={() => handleItemClick('transactions')}
        >
          <ListItemIcon><SyncAltIcon style={{ color: selectedSidebarItem === 'transactions' ? '#C78D4E' : '#FFFFFF' }} /></ListItemIcon>
          <ListItemText primary="Transactions" />
        </ListItem>
      </List> 
    </div>
  );
};

export default Sidebar;
