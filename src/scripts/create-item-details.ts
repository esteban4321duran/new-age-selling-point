import {JSONSchemaType} from 'ajv';
import {dataSource} from '../db';
import {ItemDetails} from '../app/entities';

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
  const itemDetails = new ItemDetails();
  itemDetails.description = args.description;
  itemDetails.price = Number(args.price);

  await dataSource.initialize();

  try {
    console.log(await itemDetails.save());
  } catch (error: any) {
    console.error(error.message);
  } finally {
    await dataSource.destroy();
  }
}
