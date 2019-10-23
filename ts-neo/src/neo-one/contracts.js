/* @hash dbdaf82c2113ec6f37e20c38c55e8b3a */
// tslint:disable
/* eslint-disable */
import { createCrowdFunndingSmartContract } from './CrowdFunnding/contract';

export const createContracts = (client) => ({
  crowdFunnding: createCrowdFunndingSmartContract(client),
});
