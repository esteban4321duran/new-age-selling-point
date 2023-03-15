import {
  Context,
  HttpResponseNoContent,
  HttpResponseOK,
  HttpResponseUnauthorized,
  Post,
  ValidateBody,
  verifyPassword
} from '@foal/core';
import {JSONSchemaType} from 'ajv';
import {User} from '../../entities';

const credentials: JSONSchemaType<{ password: string, userId: number }> = {
  type: 'object',
  properties: {
    password: {type: 'string'},
    userId: {type: 'number'}
  },
  required: ['password', 'userId'],
  additionalProperties: false,
}

export class AuthController {

  @Post('/login')
  @ValidateBody(credentials)
  async login(ctx: Context<User | null>) {
    const {userId, password} = ctx.request.body;
    const user = await User.findOneBy({userId});

    if (!user) {
      return new HttpResponseUnauthorized();
    }

    if (!(await verifyPassword(password, user.password))) {
      return new HttpResponseUnauthorized();
    }

    ctx.session!.setUser(user);
    ctx.user = user;

    return new HttpResponseOK({
      id: user.id,
      userId: user.userId,
    });
  }

  @Post('/logout')
  async logout(ctx: Context<User>) {
    console.log(ctx.session);
    await ctx.session?.destroy();
    return new HttpResponseNoContent();
  }

}
