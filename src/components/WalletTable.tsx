// @ts-nocheck
import React, { useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBalance, deleteWallet } from '../store/walletSlice'

const WalletTable: React.FC = () => {
  const wallets = useSelector(state => state.wallet);
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
      dispatch(fetchBalance({ walletName: wallet.walletName, addresses: wallet.addresses }));
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
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Coin</TableCell>
            <TableCell>Holding</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>    
        <TableBody>
          {wallets.map((wallet, index) => (
            <TableRow key={index + 1}>
              <TableCell>{wallet.walletName}</TableCell>
              <TableCell>{wallet.balance} BTC</TableCell>
              <TableCell>
                <IconButton aria-label="delete" onClick={() => handleDelete(wallet.walletName)}>
                  <DeleteIcon />
                </IconButton>
                <IconButton aria-label="refresh" onClick={() => handleRefresh(wallet.walletName)}>
                  <RefreshIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WalletTable;