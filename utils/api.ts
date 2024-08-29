import axios from 'axios';

export const getEthereumBlockNumber = async (): Promise<number> => {
  const response = await axios.get('https://api.blockcypher.com/v1/eth/main');
  return response.data.height;
};
