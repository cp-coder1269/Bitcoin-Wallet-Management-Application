import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TransactionTable from './components/TransactionTable';
import Footer from './components/Footer';
import ImportWalletDialog from './components/ImportWalletDialog';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';
import WalletTable from './components/WalletTable';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedSidebarItem, setSelectedSidebarItem] = useState<string>("wallets");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <Header />
      <Box display="flex" flexGrow={1}>
        <Box width="15%" bgcolor="grey.200">
          <Sidebar selectedSidebarItem={selectedSidebarItem} setSelectedSidebarItem = {setSelectedSidebarItem}/>
        </Box>
        {selectedSidebarItem==='wallets' ? (<Box width="85%" p={3} display="flex" flexDirection="column">
          <Box alignSelf="flex-end" mb={2}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<WalletIcon />}
              onClick={handleClickOpen}
            >
              Import Wallet
            </Button>
          </Box>
        <WalletTable/>
        </Box>) : (<Box width="85%" p={3}>
          <TransactionTable />
        </Box>)}
      </Box>
      <Footer />
      <ImportWalletDialog open={open} onClose={handleClose} />
      {/* <ImportWalletDialog /> */}
    </Box>
  );
};

export default App;
