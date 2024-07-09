// const axios = require('axios');
import axios from 'axios';
const TOKEN = '0595fd6003fd443d9d9e0fe3ccfa40b4';
// const TOKEN = '8e9b1ad42cba42eea4364ebe6c565a6f';
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

