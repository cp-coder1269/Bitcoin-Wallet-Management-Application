// @ts-nocheck
import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination
} from '@mui/material';
import ImportWallet from '../api/ImportWalltet';
import Transaction from '../api/Transaction';



const transactions = [
  { id: 1, coin: '2023-07-01', amount: 0.5, status: 'Completed' },
  { id: 2, coin: '2023-07-02', amount: 1.2, status: 'Pending' },
  { id: 3, coin: '2023-07-01', amount: 0.5, status: 'Completed' },
  { id: 4, coin: '2023-07-02', amount: 1.2, status: 'Pending' },
  { id: 5, coin: '2023-07-01', amount: 0.5, status: 'Completed' },
  { id: 6, coin: '2023-07-02', amount: 1.2, status: 'Pending' },
  { id: 7, coin: '2023-07-01', amount: 0.5, status: 'Completed' },
  { id: 8, coin: '2023-07-02', amount: 1.2, status: 'Pending' },
  { id: 9, coin: '2023-07-01', amount: 0.5, status: 'Completed' },
  { id: 10, coin: '2023-07-02', amount: 1.2, status: 'Pending' },
  { id: 11, coin: '2023-07-01', amount: 0.5, status: 'Completed' },
  { id: 12, coin: '2023-07-02', amount: 1.2, status: 'Pending' },
  { id: 13, coin: '2023-07-01', amount: 0.5, status: 'Completed' },
  { id: 14, coin: '2023-07-02', amount: 1.2, status: 'Pending' },
  // Add more transactions as needed
];
const names = ['cpcoder'];

const TransactionTable: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

//   const [transactions, setTransactions] = useState([]);

//   useEffect( () => {
//     const fetchTransactions = async () => {
//         const txnData = [];
//         for (const [index, name] of names.entries()) {
//           try {
//             const addresses = await ImportWallet(name, 'mnemonic');
//             console.log('Addresses:---', addresses);
            
//             // const balance = await WalletBalance(addresses) / 1000000000;
//             for(const address of addresses){
//                 const txn = await Transaction(address);
//                 txnData.push({ id: index + 1, coin: txn?.time, wallet: name, amount: txn?.value, result: txn?.type, status: txn?.confirmed });
//             }
//           } catch (error) {
//             console.error(`Error fetching wallet data for ${name}:`, error);
//           }
//         }
//         setTransactions(txnData);
//       };

//       fetchTransactions();
//   }, []);

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
