// @ts-nocheck
import axios from 'axios';
// const axios = require('axios');

const TOKEN = '0595fd6003fd443d9d9e0fe3ccfa40b4';
// const TOKEN = '8e9b1ad42cba42eea4364ebe6c565a6f';


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
          status: tx.confirmations > 0 ? 'Confirmed' : 'Unconfirmed'
        });
      });

      tx.outputs.forEach(output => {
        transactions.push({
          coin: tx.received,
          amount: output.value,
          result: 'Sent',
          status: tx.confirmations > 0 ? 'Confirmed' : 'Unconfirmed'
        });
      });
    });

    // console.log('Formatted transactions:', transactions);
    return transactions; // Return the formatted transactions array
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error; // Throw the error to be caught by the caller
  }
};

// (async () => {await Transaction('bc1qjr9y78heau4kmwl85pzzw89z50ccsv9w9qwu2p');})()
export default Transaction;