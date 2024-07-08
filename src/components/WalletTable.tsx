// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import WalletBalance from '../api/WalletBalance';
import ImportWallet from '../api/ImportWalltet';

const names = ['cpcoder', 'example'];

const WalletTable: React.FC = () => {
  const [wallets, setWallets] = useState([]);

  useEffect(() => {
    const fetchWallets = async () => {
      const walletData = [];
      for (const [index, name] of names.entries()) {
        try {
          const addresses = await ImportWallet(name, 'mnemonic');
          const balance = await WalletBalance(addresses) / 1000000000;
          walletData.push({ id: index + 1, name: name, holding: `${balance} BTC` });
        } catch (error) {
          console.error(`Error fetching wallet data for ${name}:`, error);
        }
      }
      setWallets(walletData);
    };

    fetchWallets();
  }, []);

  const handleDelete = (id: string) => {
    setWallets((prevWallets) => prevWallets.filter(wallet => wallet.id !== id));
  };

  const handleRefresh = async (id: string) => {
    const wallet = wallets.find(wallet => wallet.id === id);
    if (wallet) {
      try {
        const addresses = await ImportWallet(wallet.name, 'mnemonic');
        const balance = await WalletBalance(addresses) / 1000000000;
        setWallets((prevWallets) =>
          prevWallets.map((w) =>
            w.id === id ? { ...w, holding: `${balance} BTC` } : w
          )
        );
      } catch (error) {
        console.error(`Error refreshing wallet data for ${wallet.name}:`, error);
      }
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
          {wallets.map(wallet => (
            <TableRow key={wallet.id}>
              <TableCell>{wallet.name}</TableCell>
              <TableCell>{wallet.holding}</TableCell>
              <TableCell>
                <IconButton aria-label="delete" onClick={() => handleDelete(wallet.id)}>
                  <DeleteIcon />
                </IconButton>
                <IconButton aria-label="refresh" onClick={() => handleRefresh(wallet.id)}>
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
