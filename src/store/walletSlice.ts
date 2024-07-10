import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import ImportWallet from '../api/ImportWalltet';
import WalletBalance from '../api/WalletBalance';
import Transaction from '../api/Transaction';

// Sleep function to introduce delay
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface WalletState {
  walletName: string;
  addresses?: string[];
  balance?: number;
  transactions?: Transaction[];
}

interface ImportWalletPayload {
  walletName: string;
  mnemonic: string;
}

interface FetchBalancePayload {
  walletName: string;
  addresses: string[];
}

interface FetchTransactionsPayload {
  walletName: string;
  addresses: string[];
}

interface Transaction {
  coin: string;
  amount: number;
  result: string;
  status: string;
}

export const importWallet = createAsyncThunk(
  'wallet/importWallet',
  async ({ walletName, mnemonic }: ImportWalletPayload, { dispatch, rejectWithValue }) => {
    try {
      const addresses = await ImportWallet(walletName, mnemonic);
      // Fetch balance after importing the wallet
      const balance = await WalletBalance(addresses);
      return { walletName, addresses, balance };
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      if (error.response.status === 404) {
        return rejectWithValue('Wallet not found');
      } else {
        return rejectWithValue('Import wallet failed');
      }
    }
  }
);

export const fetchBalance = createAsyncThunk(
  'wallet/fetchBalance',
  async ({ walletName, addresses }: FetchBalancePayload) => {
    const balance = await WalletBalance(addresses);
    return { walletName, balance };
  }
);

export const fetchTransactions = createAsyncThunk(
  'wallet/fetchTransactions',
  async ({ walletName, addresses }: FetchTransactionsPayload) => {
    let transactions: Transaction[] = [];
    for (const address of addresses) {
      const txn = await Transaction(address);
      transactions = [...transactions, ...txn];
      await sleep(200);
    }
    return { walletName, transactions };
  }
);

const walletSlice = createSlice({
  name: 'wallet',
  initialState: [] as WalletState[],
  reducers: {
    deleteWallet: (state, action: PayloadAction<{ walletName: string }>) => {
      return state.filter(wallet => wallet.walletName !== action.payload.walletName);
    },
    syncWallet: (state, action: PayloadAction<{ walletName: string }>) => {
      const wallet = state.find(wallet => wallet.walletName === action.payload.walletName);
      if (wallet) {
        wallet.addresses = [];
        wallet.transactions = [];
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(importWallet.fulfilled, (state, action: PayloadAction<{ walletName: string; addresses: string[]; balance: number }>) => {
        const wallet = state.find(wallet => wallet.walletName === action.payload.walletName);
        if (wallet) {
          wallet.addresses = action.payload.addresses;
          wallet.balance = action.payload.balance;
        } else {
          state.push({ walletName: action.payload.walletName, addresses: action.payload.addresses, balance: action.payload.balance });
        }
      })
      .addCase(importWallet.rejected, (state, action) => {
        console.error('Import wallet failed:', action.payload);
      })
      .addCase(fetchBalance.fulfilled, (state, action: PayloadAction<{ walletName: string; balance: number }>) => {
        const wallet = state.find(wallet => wallet.walletName === action.payload.walletName);
        if (wallet) {
          wallet.balance = action.payload.balance;
        }
      })
      .addCase(fetchTransactions.fulfilled, (state, action: PayloadAction<{ walletName: string; transactions: Transaction[] }>) => {
        const wallet = state.find(wallet => wallet.walletName === action.payload.walletName);
        if (wallet) {
          wallet.transactions = action.payload.transactions;
        }
      });
  },
});

export const { deleteWallet, syncWallet } = walletSlice.actions;
export default walletSlice.reducer;
