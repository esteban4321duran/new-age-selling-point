import {ApiInfo, ApiServer, Context, controller, Get, Hook, HttpResponseOK, Options, UseSessions} from '@foal/core';
import {AuthController, TestController} from './api';
import {User} from '../entities';
import {OpenapiController} from './openapi.controller';

@Hook(ctx => response => {
  // Every response of this controller and its sub-controllers will be added these headers.
  response.setHeader('Access-Control-Allow-Origin', ctx.request.get('Origin') || '*');
  response.setHeader('Access-Control-Allow-Credentials', 'true');
})
@ApiInfo({
  title: 'New Age Selling Point Application API',
  version: '1.0.0'
})
@ApiServer({
  url: '/api'
})
@UseSessions({
  cookie: true,
  user: (id: number) => User.findOneBy({id}),
  userCookie: ctx => ctx.user ? JSON.stringify({id: ctx.user.id, userId: ctx.user.userId}) : '',
})
export class ApiController {
  subControllers = [
    controller('/auth', AuthController),
    controller('/swagger', OpenapiController),
    controller('/test', TestController)
  ];

  @Options('*')
  options(ctx: Context) {
    const response = new HttpResponseOK();
    // You may need to allow other headers depending on what you need.
    response.setHeader('Access-Control-Allow-Methods', 'HEAD, GET, POST, PUT, PATCH, DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Credentials,x-xsrf-token');
    return response;
  }

  @Get('/')
  index(ctx: Context) {
    return new HttpResponseOK('Hello world!');
  }

}
