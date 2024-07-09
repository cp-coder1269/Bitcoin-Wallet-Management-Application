// @ts-nocheck
import React, { useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTransactions } from '../store/walletSlice';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';


const formatDate = (dateString) => {
  const date = new Date(dateString);
  const formattedDate = new Intl.DateTimeFormat('en-GB').format(date); // dd/mm/yyyy format
  const formattedTime = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true
  }).format(date); // 11:12:33 am format
  return { formattedDate, formattedTime };
};

const TransactionTable: React.FC = () => {
  const dispatch = useDispatch();
  const wallets = useSelector(state => state.wallet);

  useEffect(() => {
    wallets.forEach(wallet => {
      if (!wallet.transactions) {
        dispatch(fetchTransactions({ walletName: wallet.walletName, addresses: wallet.addresses }));
      }
    });
  }, [wallets, dispatch]);

  const transactions = wallets.flatMap(wallet => 
    (wallet.transactions || []).map(transaction => ({
      ...transaction,
      walletName: wallet.walletName
    }))
  );

  return (
    <div style={{ height: 400, width: '100%' }}>
      <Typography variant="h5" style={{ color: '#C78D4E', fontFamily: 'Lato' }}>
        Transactions
      </Typography>
      <br />
      <Typography variant="subtitle1" gutterBottom>
        Total Transactions - {transactions.length}
      </Typography>
      {transactions.length > 0 && (
        <Paper>
          <TableContainer>
            <Table>
              <TableHead style={{ height: '30px', width: '30px', backgroundColor: '#252c35', color: '#ADABAA' }}>
                <TableRow>
                  <TableCell style={{ color: '#ADABAA' }}>Coin</TableCell>
                  <TableCell style={{ color: '#ADABAA' }}>Wallet</TableCell>
                  <TableCell style={{ color: '#ADABAA' }}>Amount</TableCell>
                  <TableCell style={{ color: '#ADABAA' }}>Result</TableCell>
                  <TableCell style={{ color: '#ADABAA' }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((transaction, index) => {
                  const { formattedDate, formattedTime } = formatDate(transaction.coin);
                  return (
                    <TableRow key={index + 1} style={{ height: '30px', fontFamily: 'Lato', backgroundColor: '#252c35', color: '#ADABAA', borderTop: '16px solid #1A1F26', width: '701px', height: '50px' }}>
                      <TableCell style={{ color: '#ADABAA', fontFamily: 'Lato', fontWeight: 600, fontSize: '12px', lineHeight: '14.4px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', border: 'none', color: '#ADABAA' }}>
                          <CurrencyBitcoinIcon style={{ height: '30px', width: '30px', marginRight: '8px', fill: '#E0B36A', borderRadius: '50%', backgroundColor: '#383124' }} />
                          <div>
                            {formattedDate}
                            <div style={{ fontWeight: 300 }}>{formattedTime}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell style={{ color: '#ADABAA' }}>{transaction.walletName.charAt(0).toUpperCase() + transaction.walletName.slice(1)}</TableCell>
                      <TableCell style={{ color: '#ADABAA' }}>{transaction.amount > 0 ? transaction.amount:0} BTC</TableCell>
                      <TableCell>
                        <div style={{ display: 'flex', alignItems: 'center', border: 'none', color: '#8484F1' }}>
                          {transaction.result.toUpperCase() === 'RECEIVED' ? <CallReceivedIcon style={{ height: '15px', width: '15px', marginRight: '2px' }} /> : <NorthEastIcon style={{ height: '15px', width: '15px', marginRight: '2px' }} />}
                          {transaction.result.toUpperCase()}
                        </div>
                      </TableCell>
                      <TableCell style={{ color: '#8484F1' }}>{transaction.status.toUpperCase()}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </div>
  );
};

export default TransactionTable;
