// @ts-nocheck
import axios from 'axios';
// const axios = require('axios');

const TOKEN = process.env.REACT_APP_API_TOKEN;


const Transaction = async (address) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://api.blockcypher.com/v1/btc/main/addrs/${address}/full?token=${TOKEN}`,
    headers: {}
  };

  try {
    const response = await axios.request(config);
    const transactions = [];
    response.data.txs.forEach(tx => {
      tx.inputs.forEach(input => {
        transactions.push({
          coin: tx.received,
          amount: input.output_value,
          result: 'Received',
          status: tx.confirmations > 0 ? 'Success' : 'Pending'
        });
      });

      tx.outputs.forEach(output => {
        transactions.push({
          coin: tx.received,
          amount: output.value,
          result: 'Sent',
          status: tx.confirmations > 0 ? 'Success' : 'Unconfirmed'
        });
      });
    });

    // console.log('Formatted transactions:', transactions);
    return transactions; 
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error; 
  }
};

// (async () => {await Transaction('bc1qjr9y78heau4kmwl85pzzw89z50ccsv9w9qwu2p');})()
export default Transaction;