import {JSONSchemaType} from 'ajv';
import {dataSource} from '../db';
import {ItemDescription} from '../app/entities';

export const schema: JSONSchemaType<{ description: string, price: number }> = {
  additionalProperties: false,
  properties: {
    description: {type: 'string'},
    price: {type: 'number'}
  },
  required: ['description', 'price'],
  type: 'object',
};

export async function main(args: { description: string, price: string }) {
  const itemDescription = new ItemDescription();
  itemDescription.description = args.description;
  itemDescription.price = Number(args.price);

  await dataSource.initialize();

  try {
    console.log(await itemDescription.save());
  } catch (error: any) {
    console.error(error.message);
  } finally {
    await dataSource.destroy();
  }
}
