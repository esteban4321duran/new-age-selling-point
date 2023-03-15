// App
import {User} from '../app/entities';
import {JSONSchemaType} from 'ajv'
import {dataSource} from '../db';
import {hashPassword} from '@foal/core';

export const schema: JSONSchemaType<{ userId: number, password: string }> = {
  additionalProperties: false,
  properties: {
    userId: {type: 'number'},
    password: {type: 'string'},
  },
  required: [
    'userId', 'password'
  ],
  type: 'object',
};

export async function main(args: { userId: string, password: string }) {
  const user = new User();
  user.userId = Number(args.userId);
  user.password = await hashPassword(args.password);

  await dataSource.initialize();

  try {
    console.log(await user.save());
  } catch (error: any) {
    console.error(error.message);
  } finally {
    await dataSource.destroy();
  }
}
