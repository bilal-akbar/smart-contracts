/* @hash 5ffe0249f6c3b2fd44b4074995bf08d2 */
// tslint:disable
/* eslint-disable */
import { createWithContracts } from '@neo-one/smart-contract-test';
import * as path from 'path';

export const withContracts = createWithContracts([
  { name: 'CrowdFunnding', filePath: path.resolve(__dirname, '../../neo-one/contracts/CrowdFunding.ts') },
]);
