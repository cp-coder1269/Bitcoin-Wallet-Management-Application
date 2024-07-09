// @ts-nocheck
const axios = require('axios');
const Transaction = require('./Transaction');
const WalletBalance = require('./WalletBalance');

const TOKEN = process.env.REACT_APP_API_TOKEN;

const mapWalletData = (data) => {
  if (data == null) return null;
  return data.chains.flatMap(chain => chain.chain_addresses.map(addr => addr.address));
};

const getWallet = async (name) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://api.blockcypher.com/v1/btc/main/wallets/hd/${name}?token=${TOKEN}`,
    headers: {}
  };

  try {
    const response = await axios.request(config);
    // console.log(JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    // console.error(`Error retrieving wallet ${name}:`, error);
    return null; 
  }
};

(async () => {
  const walletNames = ['example', 'cpcoder', 'prince'];
  const walletAddressesMaps = new Map();

  for (const name of walletNames) {
    const wallet = await getWallet(name);
    // console.log(`Wallet result for ${name}: `, wallet);

    if (wallet != null) {
      const addresses = mapWalletData(wallet);
      walletAddressesMaps.set(name, addresses);
      // console.log(`Wallet addresses for ${name}: `, addresses);
    } else {
      // console.log(`Error retrieving wallet ${name}`);
    }
  }

  // console.log('All wallet addresses maps:', walletAddressesMaps);

  const balances = [];
  const transactions = [];

  for (const [walletName, addresses] of walletAddressesMaps.entries()) {
    const walletBalance = await WalletBalance(addresses);
    balances.push({ walletName, walletBalance });

    for (const address of addresses) {
      try {
        const addressTransactions = await Transaction(address);
        transactions.push({ walletName, address, ...addressTransactions });
      } catch (error) {
        // console.error(`Error fetching transactions for ${address}:`, error);
      }
    }
  }
})();
