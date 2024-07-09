// @ts-nocheck
import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination
,Typography} from '@mui/material';
import Transaction from '../api/Transaction';
import { useSelector,useDispatch} from 'react-redux';
import { fetchTransactions } from '../store/walletSlice';


const TransactionTable: React.FC = () => {
//   const [transactions, setTransactions] = useState([]);
//   const wallets = useSelector(state => state.wallet);

//   useEffect( () => {
//     const fetchTransactions = async () => {
//         const txnData = [];
//         for (const wallet of wallets) {
//             // console.log('State Variable:---', wallet.walletName, wallet.addresses);    
//           try {
//             const addresses = wallet.addresses;
//             for(const address of addresses){
//                 const txns = await Transaction(address);
//                 txns.forEach((txn) => {
//                     txnData.push({
//                         id: txnData.length + 1,
//                         coin: txn?.coin,
//                         wallet: wallet?.walletName,
//                         amount: txn?.amount,
//                         result: txn?.result,
//                         status: txn?.status
//                       });
//                 });      
//             }
//           } catch (error) {
//             console.error(`Error fetching wallet data for ${wallet.walletName}:`, error);
//           }
//         }
//         setTransactions(txnData);
//         // console.log('Transactions:--->', txnData);
//         // console.log('Transactions State:--->', transactions);
//       };
//       fetchTransactions();
//   }, [wallets]);

const dispatch = useDispatch();
  const wallets = useSelector(state => state.wallet);
  console.log('txmnTable wallets:--->', wallets);
  

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
    <Typography variant="h5" style={{color: '#C78D4E', fontFamily:'lato'}}>
        Transactions
    </Typography>
    <br />
    <Typography variant="subtitle1" gutterBottom>
        Total Transactions - {transactions.length}
    </Typography>
    {transactions.length > 0 &&(<Paper>
      <TableContainer>
        <Table>
          <TableHead style={{ backgroundColor: '#252c35', color: '#ADABAA'}}>
            <TableRow>
            <TableCell style={{color: '#ADABAA'}}>Coin</TableCell>
            <TableCell style={{color: '#ADABAA'}}>Wallet</TableCell>
            <TableCell style={{color: '#ADABAA'}}>Amount</TableCell>
            <TableCell style={{color: '#ADABAA'}}>Result</TableCell>
            <TableCell style={{color: '#ADABAA'}}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction, index) => (
              <TableRow key={index+1} style={{backgroundColor: '#252c35', color:'#ADABAA', borderTop: '8px solid #1A1F26', borderBottom: '8px solid #1A1F26', width:'701px', height:'50px'}} >
                <TableCell style={{color: '#ADABAA'}}>{transaction.coin}</TableCell>
                <TableCell style={{color: '#ADABAA'}}>{transaction.walletName}</TableCell>
                <TableCell style={{color: '#ADABAA'}}>{transaction.amount}</TableCell>
                <TableCell style={{color: '#8484F1'}}>{transaction.result.toUpperCase()}</TableCell>
                <TableCell style={{color: '#8484F1'}}>{transaction.status.toUpperCase()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>)}
    </div>
  );
};

export default TransactionTable;
