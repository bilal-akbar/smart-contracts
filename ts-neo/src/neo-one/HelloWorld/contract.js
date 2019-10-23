/* @hash 2ec3534904ed204646bbd30f7ec6fd1f */
// tslint:disable
/* eslint-disable */
import { helloWorldABI } from './abi';
import { sourceMaps } from '../sourceMaps';

const definition = {
  networks: {
    local: {
      address: 'AbFSkJtX3yj7ES5nTgPA2p7hvJLpFMkyoG',
    },
  },
  abi: helloWorldABI,
  sourceMaps,
};

export const createHelloWorldSmartContract = (client) => client.smartContract(definition);
