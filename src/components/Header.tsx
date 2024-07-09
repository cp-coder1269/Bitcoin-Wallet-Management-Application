// @ts-nocheck
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import DiamondIcon from '@mui/icons-material/Diamond';
import SyncIcon from '@mui/icons-material/Sync';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBalance, fetchTransactions, importWallet, syncWallet } from '../store/walletSlice';

const Header: React.FC = () => {
  const wallets = useSelector(state => state.wallet);
  const dispatch = useDispatch();
  const [isSynced, setIsSynced] = useState(true);

  const syncWallets = async () => {
    setIsSynced(false);
    for (const wallet of wallets) {
      await dispatch(syncWallet({ walletName: wallet.walletName }));
      await dispatch(importWallet({ walletName: wallet.walletName, mnemonic: 'mnemonic' }));
      await dispatch(fetchBalance({ walletName: wallet.walletName, addresses: wallet.addresses }));
      await dispatch(fetchTransactions({ walletName: wallet.walletName, addresses: wallet.addresses }));
    }
    setIsSynced(true);
  };

  return (
    <AppBar position="static" style={{ backgroundColor: '#1A1F26', color: '#FFFFFF' }}>
      <Toolbar>
        <Button color="inherit" style={{ textTransform: 'none' }} startIcon={<DiamondIcon />} onClick={() => { console.log('Button Pressed'); }}>
          <Typography>cySync</Typography>
        </Button>
        <div style={{ flexGrow: 1 }}></div>
        <div style={{color:'#E0B36A'}}>
            <Button onClick={syncWallets} color="inherit" style={{ textTransform: 'none' }} endIcon={<SyncIcon />}>
            {isSynced ? 'Synced' : 'Syncing...'}
            </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
