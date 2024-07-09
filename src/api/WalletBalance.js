// @ts-nocheck
// const axios = require('axios');
import axios from 'axios';

const TOKEN = process.env.REACT_APP_API_TOKEN;


// takes [addresses] of a wallet and return their balance combined
const WalletBalance = async (addresses) => {
  // console.log("addresses:", addresses);
  let balance = 0;
  let count = 0;

  const balancePromises = addresses.map(async (address) => {
    // console.log('calling for address:', address);

    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://api.blockcypher.com/v1/btc/main/addrs/${address}/balance?token=${TOKEN}`,
      headers: { }
    };
    try {
      const response = await axios.request(config);
      // console.log('balance response:', response);
      balance += response.data.final_balance;
      count++;
    } catch (error) {
      // console.log(error);
    }
  });

  await Promise.all(balancePromises);

  // console.log('balance:', balance);
  // console.log('count:', count);
  // console.log('length:', addresses.length);

  return balance;
};
// const addresses = ['bc1qaw07s7kg4pq2gfjka4fdt04e4eftnq6y5frv39', 'bc1qjr9y78heau4kmwl85pzzw89z50ccsv9w9qwu2p'];
// addresses.map(async (address) => {
//   const balance = await WalletBalance([address]);
//   console.log(address, 'balance:', balance);
// })

export default WalletBalance;
