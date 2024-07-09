// @ts-nocheck
import React, { useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton,Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBalance, deleteWallet } from '../store/walletSlice'
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';

const WalletTable: React.FC = () => {
  const wallets = useSelector(state => state.wallet);
  const count = wallets.length;
  console.log('Wallets:****--->', wallets);
  
  const dispatch = useDispatch();

//   useEffect(() => {
//     const walletNames = ['cpcoder'];
//     walletNames.forEach(walletName => {
//       dispatch(importWallet({ walletName, mnemonic: 'mnemonic' }));
//     });
//   }, [dispatch]);

  useEffect(() => {
    wallets.forEach(wallet => {
    if(wallet.addresses.length <= 0){
      dispatch(fetchBalance({ walletName: wallet.walletName, addresses: wallet.addresses }));
    }
    });
  }, [wallets, dispatch]);

  const handleDelete = (walletName) => {
    dispatch(deleteWallet({ walletName }));
  };

  const handleRefresh = (walletName) => {
    const wallet = wallets.find(w => w.walletName === walletName);
    if (wallet) {
      dispatch(fetchBalance({ walletName: wallet.walletName, addresses: wallet.addresses }));
    }
  };

  return (
    <div>
      <Typography variant="subtitle1" gutterBottom>
        Total Coins - {count}
      </Typography>
      <br />
        {count > 0 && (<TableContainer component={Paper} >
        <Table>
            <TableHead style={{ backgroundColor: '#252c35', color: 'white'}}>
            <TableRow>
            <TableCell style={{color: 'white'}}>Coin</TableCell>
            <TableCell style={{color: 'white'}}>Holding</TableCell>
            <TableCell style={{color: 'white'}}>Action</TableCell>
            </TableRow>
            </TableHead>    
            <TableBody>
            {wallets.map((wallet, index) => (
                <TableRow key={index + 1} style={{backgroundColor: '#252c35', color:'white', borderTop: '8px solid #1A1F26', borderBottom: '8px solid #1A1F26'}}>
                <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center', border:'none', color: 'white' }}>
                    <CurrencyBitcoinIcon style={{ height: '30px',width: '30px', marginRight: '2px', fill: '#E0B36A', border:'circle', borderRadius: '50%', backgroundColor: '#383124'}} />
                    {wallet.walletName.toUpperCase()}
                    </div>
                </TableCell>
                <TableCell style={{color: 'white'}}>BTC {wallet.balance ? wallet.balance : 0}</TableCell>
                <TableCell>
                    <IconButton style={{color: 'grey'}} aria-label="delete" onClick={() => handleDelete(wallet.walletName)}>
                    <DeleteIcon />
                    </IconButton>
                    <IconButton style={{color: 'green'}}aria-label="refresh" onClick={() => handleRefresh(wallet.walletName)}>
                    <RefreshIcon />
                    </IconButton>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>)}
    </div>
  );
};

export default WalletTable;