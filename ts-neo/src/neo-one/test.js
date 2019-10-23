/* @hash ed35bcc858888881d89680d1f4d8992a */
// tslint:disable
/* eslint-disable */
import { createWithContracts } from '@neo-one/smart-contract-test';
import * as path from 'path';

export const withContracts = createWithContracts([
  { name: 'CrowdFunnding', filePath: path.resolve(__dirname, '../../neo-one/contracts/CrowdFunding.ts') },
  { name: 'HelloWorld', filePath: path.resolve(__dirname, '../../neo-one/contracts/HelloWorld.ts') },
]);
