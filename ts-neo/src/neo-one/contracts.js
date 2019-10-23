/* @hash 301928ffeb453b909e607a0fce33112f */
// tslint:disable
/* eslint-disable */
import { createCrowdFunndingSmartContract } from './CrowdFunnding/contract';
import { createHelloWorldSmartContract } from './HelloWorld/contract';

export const createContracts = (client) => ({
  crowdFunnding: createCrowdFunndingSmartContract(client),
  helloWorld: createHelloWorldSmartContract(client),
});
