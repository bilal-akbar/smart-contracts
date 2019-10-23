/* @hash 84a6596dc82565205d593d49ed9ea044 */
// tslint:disable
/* eslint-disable */
import { crowdFunndingABI } from './abi';
import { sourceMaps } from '../sourceMaps';

const definition = {
  networks: {
    local: {
      address: 'AQbbhXeXhKeQpNCBhaHo4x8Ve2yEvbdJcH',
    },
  },
  abi: crowdFunndingABI,
  sourceMaps,
};

export const createCrowdFunndingSmartContract = (client) => client.smartContract(definition);
