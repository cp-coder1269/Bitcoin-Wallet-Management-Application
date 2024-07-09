// @ts-nocheck
import React, { FormEvent, useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, IconButton, Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { importWallet } from '../store/walletSlice';
import {  useDispatch } from 'react-redux';

interface ImportWalletDialogProps {
  open: boolean;
  onClose: () => void;
}

const ImportWalletDialog: React.FC<ImportWalletDialogProps> = ({ open, onClose }) => {
  const [walletName, setWalletName] = useState<string>('');
  const [mnemonic, setMnemonic] = useState<string>('');
  const dispatch = useDispatch();

    const handleSubmit = async (event: FormEvent) => {
      event.preventDefault();
      if (!walletName) {
        console.log('Wallet name is required.');
        return;
      }
      dispatch(importWallet({ walletName, mnemonic }));
      resetAll();
  };

  const resetAll = () => {
    setWalletName('');
    setMnemonic('');
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          width: 545,
          height: 383,
          marginTop: 209,
          marginLeft: 278,
          textAlign: 'center',  // Center dialog content
          padding: 20,  // Add padding for spacing
          backgroundColor: '#1A1F26',
          color:'white'
        }
      }}
    >
      <DialogTitle>
        <Typography variant="h5" align="center">
          Import Wallet
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <TextField
          autoFocus
          required
          margin="dense"
          label="Enter your wallet name"
          type="text"
          fullWidth
          variant="outlined"
          InputLabelProps={{
            style: { color: 'white' }
          }}
          InputProps={{
            style: { color: 'white' }
          }}
          value={walletName}
          onChange={(e) => setWalletName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Enter your mnemonic"
          type="text"
          multiline
          rows={3}
          fullWidth
          variant="outlined"
          InputLabelProps={{
            style: { color: 'white' }
          }}
          InputProps={{
            style: { color: 'white' }
          }}
          value={mnemonic}
          onChange={(e) => setMnemonic(e.target.value)}
        />
      </DialogContent>
      <DialogActions style={{ justifyContent: 'center' }}>
        <Button color="primary" variant="contained" style={{textTransform: 'none', backgroundColor:'#E0B36A'}} onClick={handleSubmit} disabled={!walletName}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImportWalletDialog;
