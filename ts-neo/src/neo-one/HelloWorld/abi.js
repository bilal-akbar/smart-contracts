/* @hash 4c8a4c2476694ec3e91ced8e5d054dd4 */
// tslint:disable
/* eslint-disable */
export const helloWorldABI = {
  events: [
    {
      name: 'hello',
      parameters: [
        {
          forwardedValue: false,
          name: 'name',
          optional: false,
          type: 'String',
        },
      ],
    },
  ],
  functions: [
    {
      claim: false,
      constant: false,
      name: 'hello',
      parameters: [
        {
          forwardedValue: false,
          name: 'name',
          optional: false,
          type: 'String',
        },
      ],
      receive: false,
      returnType: {
        forwardedValue: false,
        optional: false,
        type: 'String',
      },
      send: false,
      sendUnsafe: false,
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
