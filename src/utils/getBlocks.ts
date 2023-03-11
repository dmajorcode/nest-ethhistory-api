import axios from 'axios';
import axiosRetry from 'axios-retry';
import {
  blockResponse,
  blockResult,
  txLog,
  txResponse,
  txResult,
} from './interface';

export const getBlockTx = async (block: string) => {
  try {
    axiosRetry(axios, { retries: 1000 });
    const data = await axios.post(
      `https://${process.env.ETHEREUM_NETWORK}.infura.io/v3/${process.env.INFURA_API_KEY}`,
      {
        jsonrpc: '2.0',
        method: 'eth_getBlockByNumber',
        params: [block, false],
        id: 1,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const resData: blockResponse = data.data;
    const resResult: blockResult = resData.result;
    const resTx: string[] = resResult.transactions;

    resTx.map(async (tx: string) => await getTxReceipt(tx));
  } catch (e) {
    console.log(e);
  }
};

export const getTxReceipt = async (tx: string) => {
  try {
    axiosRetry(axios, { retries: 1000 });
    const data = await axios.post(
      `https://${process.env.ETHEREUM_NETWORK}.infura.io/v3/${process.env.INFURA_API_KEY}`,
      {
        jsonrpc: '2.0',
        method: 'eth_getTransactionReceipt',
        params: [tx],
        id: 1,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const resData: txResponse = data.data;
    const resResult: txResult = resData.result;
    const resLog: txLog[] = resResult.logs;
    console.log(tx, resLog);
  } catch (e) {
    console.log(e);
  }
};
