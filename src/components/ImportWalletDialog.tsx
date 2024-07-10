// @ts-nocheck
import React, { FormEvent, useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, IconButton, Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { importWallet } from '../store/walletSlice';
import { useDispatch } from 'react-redux';

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
      onClose={resetAll}
      PaperProps={{
        style: {
          width: 545,
          height: 383,
          marginTop: 209,
          marginLeft: 278,
          textAlign: 'center',  // Center dialog content
          padding: 20,  // Add padding for spacing
          backgroundColor: '#171C23',
          color: '#A6A2A2'
        }
      }}
    >
      <DialogTitle>
        <Typography variant="h5" align="center" component="div">
          Import Wallet
        </Typography>
        <IconButton
          aria-label="close"
          onClick={resetAll}
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
        <label htmlFor="wallet-name" style={{ display: 'block', textAlign: 'left', color: '#A6A2A2', marginBottom: 4 }}>Enter your wallet name:</label>
        <TextField
          autoFocus
          required
          margin="dense"
          type="text"
          fullWidth
          variant="outlined"
          InputLabelProps={{
            style: { color: '#20242B', textAlign: 'left', marginLeft: 0 }
          }}
          InputProps={{
            style: { color: '#A6A2A2', borderColor: '#20242B', backgroundColor: '#20242B' }
          }}
          value={walletName}
          onChange={(e) => setWalletName(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#20242B',
              },
              '&:hover fieldset': {
                borderColor: '#20242B',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#20242B',
              },
              backgroundColor: '#20242B',
            },
          }}
        />
        <label htmlFor="mnemonic" style={{ display: 'block', textAlign: 'left', color: '#A6A2A2', marginBottom: 4, marginTop: 16 }}>Enter your mnemonic:</label>
        <TextField
          margin="dense"
          type="text"
          multiline
          rows={3}
          fullWidth
          variant="outlined"
          InputLabelProps={{
            style: { color: '#A6A2A2', textAlign: 'left', marginLeft: 0 }
          }}
          InputProps={{
            style: { color: '#A6A2A2', borderColor: '#20242B', backgroundColor: '#20242B' }
          }}
          value={mnemonic}
          onChange={(e) => setMnemonic(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#20242B',
              },
              '&:hover fieldset': {
                borderColor: '#20242B',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#20242B',
              },
              backgroundColor: '#20242B',
            },
          }}
        />
      </DialogContent>
      <DialogActions style={{ justifyContent: 'center' }}>
        <Button
          color="primary"
          variant="contained"
          style={{
            textTransform: 'none',
            backgroundColor: '#DB953C',
            color: '#FFFFFF',
            width: '86px',
            height: '31.96px',
            borderRadius: '4px 4px 4px 4px',
            fontFamily: 'Lato',
            fontSize: '14px',
            fontWeight: 700,
            lineHeight: '16.8px',
            textAlign: 'right',
          }}
          onClick={handleSubmit}
          disabled={!walletName}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImportWalletDialog;
