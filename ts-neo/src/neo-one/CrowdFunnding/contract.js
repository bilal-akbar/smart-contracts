/* @hash a3372b64691c59ef16a96e7a6b5ac7d7 */
// tslint:disable
/* eslint-disable */
import { crowdFunndingABI } from './abi';
import { sourceMaps } from '../sourceMaps';

const definition = {
  networks: {
    local: {
      address: 'AUc3uuCNCNjGV3atF8WwQxKXMnb89b368v',
    },
  },
  abi: crowdFunndingABI,
  sourceMaps,
};

export const createCrowdFunndingSmartContract = (client) => client.smartContract(definition);
