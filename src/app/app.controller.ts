import {controller, IAppController} from '@foal/core';

import {ApiController, OpenapiController} from './controllers';

// @Log('AppController', {
//   body: true,
//   headers: ['X-CSRF-Token'],
//   params: true,
//   query: true
// })
export class AppController implements IAppController {
  subControllers = [
    controller('/api', ApiController),
    controller('/swagger', OpenapiController),
  ];
}
