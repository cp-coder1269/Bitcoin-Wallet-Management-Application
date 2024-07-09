// const axios = require('axios');
import axios from 'axios';

const TOKEN = process.env.REACT_APP_API_TOKEN;

const flatAddresses = (data: any) => {
    return data.chains.flatMap((chain: { chain_addresses: any[]; }) => chain.chain_addresses.map(addr => addr.address));
};
const ImportWallet = async (walletName: string, mnemonic: string) => {

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://api.blockcypher.com/v1/btc/main/wallets/hd/${walletName}?token=${TOKEN}`,
        headers: { }
      };
      
      try {
        const { data: response } = await axios.request(config);
        return flatAddresses(response) ; 
      } catch (error) {
        console.log('some error occurend while importing wallet');
      }
};



export default ImportWallet;

