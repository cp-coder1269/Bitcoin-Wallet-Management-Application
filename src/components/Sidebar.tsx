// @ts-nocheck
import React, { useState } from 'react';
import { Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SyncIcon from '@mui/icons-material/Sync';
import ListIcon from '@mui/icons-material/List';

interface SidebarProps {
  selectedSidebarItem: string;
  setSelectedSidebarItem: React.Dispatch<React.SetStateAction<string>>;
}
const Sidebar: React.FC<SidebarProps> = ({selectedSidebarItem, setSelectedSidebarItem}) => {

  const handleItemClick = (item: string) => {
    setSelectedSidebarItem(item);
    console.log(`Clicked on ${item}`);
    // You can add logic here to show the corresponding table based on item clicked
  };
  
  return (
    <div>
      <List>
        <ListItem
          style={{ backgroundColor: selectedSidebarItem === 'wallets' ? '#f0f0f0' : 'inherit' }}
          onClick={() => handleItemClick('wallets')}
        >
          <ListItemIcon><WalletIcon /></ListItemIcon>
          <ListItemText primary="Wallets" />
        </ListItem>
        <ListItem
          style={{ backgroundColor: selectedSidebarItem === 'transactions' ? '#f0f0f0' : 'inherit' }}
          onClick={() => handleItemClick('transactions')}
        >
          <ListItemIcon><SyncIcon /></ListItemIcon>
          <ListItemText primary="Transactions" />
        </ListItem>
        <ListItem
          style={{ backgroundColor: selectedSidebarItem === 'latestTransactions' ? '#f0f0f0' : 'inherit' }}
          onClick={() => handleItemClick('latestTransactions')}
        >
          <ListItemIcon><ListIcon /></ListItemIcon>
          <ListItemText primary="Latest Transactions" />
        </ListItem>
      </List> 
    </div>
  );
};

export default Sidebar;
