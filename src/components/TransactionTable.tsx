// @ts-nocheck
import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination
} from '@mui/material';
import Transaction from '../api/Transaction';
import { useSelector} from 'react-redux';



// const transactions = [
//   { id: 1, coin: '2023-07-01', amount: 0.5, status: 'Completed' },
//   { id: 2, coin: '2023-07-02', amount: 1.2, status: 'Pending' },
//   { id: 3, coin: '2023-07-01', amount: 0.5, status: 'Completed' },
//   { id: 4, coin: '2023-07-02', amount: 1.2, status: 'Pending' },
//   { id: 5, coin: '2023-07-01', amount: 0.5, status: 'Completed' },
//   { id: 6, coin: '2023-07-02', amount: 1.2, status: 'Pending' },
//   { id: 7, coin: '2023-07-01', amount: 0.5, status: 'Completed' },
//   { id: 8, coin: '2023-07-02', amount: 1.2, status: 'Pending' },
//   { id: 9, coin: '2023-07-01', amount: 0.5, status: 'Completed' },
//   { id: 10, coin: '2023-07-02', amount: 1.2, status: 'Pending' },
//   { id: 11, coin: '2023-07-01', amount: 0.5, status: 'Completed' },
//   { id: 12, coin: '2023-07-02', amount: 1.2, status: 'Pending' },
//   { id: 13, coin: '2023-07-01', amount: 0.5, status: 'Completed' },
//   { id: 14, coin: '2023-07-02', amount: 1.2, status: 'Pending' },
//   // Add more transactions as needed
// ];
const names = ['cpcoder'];

const TransactionTable: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [transactions, setTransactions] = useState([]);
  const wallets = useSelector(state => state.wallet);

  useEffect( () => {
    const fetchTransactions = async () => {
        const txnData = [];
        for (const wallet of wallets) {
            // console.log('State Variable:---', wallet.walletName, wallet.addresses);    
          try {
            const addresses = wallet.addresses;
            for(const address of addresses){
                const txns = await Transaction(address);
                // console.log('Transaction:--->', txns);
                txns.forEach((txn) => {
                    txnData.push({
                        id: txnData.length + 1,
                        coin: txn?.coin,
                        wallet: wallet?.walletName,
                        amount: txn?.amount,
                        result: txn?.result,
                        status: txn?.status
                      });
                });      
            }
          } catch (error) {
            console.error(`Error fetching wallet data for ${wallet.walletName}:`, error);
          }
        }
        setTransactions(txnData);
        // console.log('Transactions:--->', txnData);
        // console.log('Transactions State:--->', transactions);
      };
      fetchTransactions();
  }, [wallets]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, transactions.length - page * rowsPerPage);

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Coin</TableCell>
              <TableCell>Wallet</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Result</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(transaction => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.coin}</TableCell>
                <TableCell>{transaction.wallet}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>{transaction.result}</TableCell>
                <TableCell>{transaction.status}</TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={4} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={transactions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TransactionTable;
