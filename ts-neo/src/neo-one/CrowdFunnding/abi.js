/* @hash 056a25c0bd50f1427c4ba083f859bbc5 */
// tslint:disable
/* eslint-disable */
export const crowdFunndingABI = {
  events: [],
  functions: [
    {
      claim: false,
      constant: false,
      name: 'createNewProject',
      parameters: [
        {
          forwardedValue: false,
          name: 'title',
          optional: false,
          type: 'String',
        },
        {
          forwardedValue: false,
          name: 'description',
          optional: false,
          type: 'String',
        },
        {
          decimals: 8,
          forwardedValue: false,
          name: 'goal',
          optional: false,
          type: 'Integer',
        },
        {
          decimals: 0,
          forwardedValue: false,
          name: 'days',
          optional: false,
          type: 'Integer',
        },
        {
          forwardedValue: false,
          name: 'owner',
          optional: false,
          type: 'Address',
        },
      ],
      receive: false,
      returnType: {
        optional: false,
        type: 'Void',
      },
      send: false,
      sendUnsafe: false,
    },
    {
      claim: false,
      constant: true,
      name: 'getProjectsCount',
      parameters: [],
      receive: false,
      returnType: {
        decimals: 0,
        forwardedValue: false,
        optional: false,
        type: 'Integer',
      },
      send: false,
      sendUnsafe: false,
    },
    {
      claim: false,
      constant: true,
      name: 'getProjectByIndex',
      parameters: [
        {
          decimals: 0,
          forwardedValue: false,
          name: 'index',
          optional: false,
          type: 'Integer',
        },
      ],
      receive: false,
      returnType: {
        forwardedValue: false,
        optional: true,
        properties: {
          deadline: {
            decimals: 0,
            forwardedValue: false,
            optional: false,
            type: 'Integer',
          },
          description: {
            forwardedValue: false,
            optional: false,
            type: 'String',
          },
          goal: {
            decimals: 8,
            forwardedValue: false,
            optional: false,
            type: 'Integer',
          },
          owner: {
            forwardedValue: false,
            optional: false,
            type: 'Address',
          },
          raised: {
            decimals: 8,
            forwardedValue: false,
            optional: false,
            type: 'Integer',
          },
          state: {
            decimals: 0,
            forwardedValue: false,
            optional: false,
            type: 'Integer',
          },
          title: {
            forwardedValue: false,
            optional: false,
            type: 'String',
          },
        },
        type: 'Object',
      },
      send: false,
      sendUnsafe: false,
    },
    {
      claim: false,
      constant: false,
      name: 'contribute',
      parameters: [
        {
          decimals: 0,
          forwardedValue: false,
          name: 'index',
          optional: false,
          type: 'Integer',
        },
      ],
      receive: true,
      returnType: {
        optional: false,
        type: 'Void',
      },
      send: false,
      sendUnsafe: false,
    },
    {
      claim: false,
      constant: false,
      name: 'payOut',
      parameters: [
        {
          decimals: 0,
          forwardedValue: false,
          name: 'index',
          optional: false,
          type: 'Integer',
        },
      ],
      receive: false,
      returnType: {
        optional: false,
        type: 'Void',
      },
      send: true,
      sendUnsafe: false,
    },
    {
      name: 'refundAssets',
      parameters: [],
      returnType: {
        type: 'Void',
      },
      sendUnsafe: true,
    },
    {
      completeSend: true,
      name: 'completeSend',
      parameters: [],
      returnType: {
        type: 'Void',
      },
    },
    {
      name: 'deploy',
      parameters: [],
      returnType: {
        type: 'Boolean',
      },
    },
  ],
};
