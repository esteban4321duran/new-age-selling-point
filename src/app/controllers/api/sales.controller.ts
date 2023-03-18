import {
  ApiOperationDescription, ApiOperationId, ApiOperationSummary, ApiResponse,
  ApiUseTag, Context, Delete, Get, HttpResponseCreated, HttpResponseNoContent,
  HttpResponseNotFound, HttpResponseOK, Patch, Post,
  UserRequired, ValidateBody, ValidatePathParam, ValidateQueryParam
} from '@foal/core';

import {ItemDetails, SaleItem, Sales} from '../../entities';
import {JSONSchemaType} from 'ajv';

// const salesSchema: JSONSchemaType<{
//   year: number;
//   month: number;
//   day: number;
//   hours: number;
//   minutes: number;
//   seconds: number;
// }> = {
//   additionalProperties: false,
//   properties: {
//     year: {type: 'number'},
//     month: {type: 'number'},
//     day: {type: 'number'},
//     hours: {type: 'number'},
//     minutes: {type: 'number'},
//     seconds: {type: 'number'},
//   },
//   required: ['year', 'month', 'day', 'hours', 'minutes', 'seconds'],
//   type: 'object',
// };
const saleItemSchema: JSONSchemaType<{
  itemCode: number;
  quantity: number;
}> = {
  type: 'object',
  additionalProperties: false,
  properties: {
    itemCode: {type: 'number'},
    quantity: {type: 'number'},
  },
  required: ['itemCode', 'quantity']
}
const finishSaleSchema: JSONSchemaType<{ finished: boolean }> = {
  type: 'object',
  additionalProperties: false,
  properties: {
    finished: {type: 'boolean'}
  },
  required: ['finished']
}

@ApiUseTag('sales')
export class SalesController {

  @Get('/')
  @ApiOperationId('findSales')
  @ApiOperationSummary('Find finished sales.')
  @ApiOperationDescription(
    'The query parameters "skip" and "take" can be used for pagination. The first ' +
    'is the offset and the second is the number of elements to be returned.'
  )
  @ApiResponse(400, {description: 'Invalid query parameters.'})
  @ApiResponse(200, {description: 'Returns a list of sales.'})
  @ValidateQueryParam('skip', {type: 'number'}, {required: false})
  @ValidateQueryParam('take', {type: 'number'}, {required: false})
  @UserRequired()
  async findSales(ctx: Context) {
    const sales = await Sales.find({
      where: {
        finished: true
      },
    });

    return new HttpResponseOK(sales);
  }

  @Get('/:saleId')
  @ApiOperationId('findSalesById')
  @ApiOperationSummary('Find a sale by ID.')
  @ApiResponse(400, {description: 'Invalid :saleId'})
  @ApiResponse(404, {description: 'Index not found.'})
  @ApiResponse(200, {description: 'Returns the sales.'})
  @ValidatePathParam('saleId', {type: 'number'})
  @UserRequired()
  async findSalesById(ctx: Context) {
    const sale = await Sales.findOneBy({id: ctx.request.params.saleId});

    if (!sale) {
      return new HttpResponseNotFound();
    }

    return new HttpResponseOK(sale);
  }

  @Post()
  @ApiOperationId('createSale')
  @ApiOperationSummary('Create a new sale.')
  @ApiResponse(400, {description: 'Invalid sale.'})
  @ApiResponse(201, {description: 'Index successfully created. Returns the sale.'})
  @UserRequired()
  async createSales(ctx: Context) {
    // {
    //   year: datetime.getFullYear(),
    //     month: datetime.getMonth(),
    //   day: datetime.getDay(),
    //   hours: datetime.getHours(),
    //   minutes: datetime.getMinutes(),
    // }
    const sale = await Sales.save({dateTime: new Date()});
    return new HttpResponseCreated(sale);
  }

  @Get('/:saleId/saleItems')
  @ApiOperationId('Get sale items for a sale')
  @ApiOperationSummary('Find sale items for this sale')
  @ApiResponse(400, {description: 'Invalid :saleId'})
  @ApiResponse(404, {description: 'Index not found'})
  @ApiResponse(200, {description: 'Returns a list of sales.'})
  @ValidatePathParam('saleId', {type: 'number'})
  @UserRequired()
  async findSaleItems(ctx: Context) {
    const sale = await Sales.findOneBy({id: ctx.request.params.saleId});
    if (!sale)
      return new HttpResponseNotFound();
    sale.items.sort((a, b) => {
      if (a.details.id < b.details.id)
        return -1;
      if (a.details.id > b.details.id)
        return 1;
      return 0;
    })

    return new HttpResponseCreated(sale);
  }

  @Post('/:saleId/saleItems')
  @ValidatePathParam('saleId', {type: 'number'})
  @ValidateBody(saleItemSchema)
  @UserRequired()
  async addSaleItem(ctx: Context) {
    const sale = await Sales.findOne({
      where: {
        id: ctx.request.params.saleId
      },
      relations: [
        'items'
      ]
    });
    if (!sale)
      return new HttpResponseNotFound();

    const {itemCode, quantity} = ctx.request.body;
    const itemDetails = await ItemDetails.findOneBy({id: itemCode})
    if (!itemDetails)
      return new HttpResponseNotFound();

    const item = new SaleItem();
    item.details = itemDetails;
    item.quantity = quantity;
    item.sale = sale;

    return new HttpResponseCreated(await item.save());
  }

  @Delete('/:saleId/saleItems/:saleItemId')
  @ValidatePathParam('saleId', {type: 'number'})
  @ValidatePathParam('saleItemId', {type: 'number'})
  @UserRequired()
  async removeSaleItem(ctx: Context) {
    const {saleId, saleItemId} = ctx.request.params;

    const sale = await Sales.findOneBy({id: saleId});
    if (!sale)
      return new HttpResponseNotFound();

    const saleItem = await SaleItem.findOneBy({id: saleItemId});
    await saleItem?.remove();

    return new HttpResponseNoContent();
  }

  @Patch('/:saleId')
  @ApiOperationId('modifySales')
  @ApiOperationSummary('Update/modify an existing sales.')
  @ApiResponse(400, {description: 'Invalid sales.'})
  @ApiResponse(404, {description: 'Sales not found.'})
  @ApiResponse(200, {description: 'Sales successfully updated. Returns the sales.'})
  @ValidatePathParam('saleId', {type: 'number'})
  @ValidateBody(finishSaleSchema)
  @UserRequired()
  async finishSale(ctx: Context) {
    const sale = await Sales.findOneBy({id: ctx.request.params.saleId});

    if (!sale) {
      return new HttpResponseNotFound();
    }

    sale.finished = ctx.request.body.finished;

    await Sales.save(sale);

    return new HttpResponseOK(sale);
  }

  //
  // @Put('/:salesId')
  // @ApiOperationId('replaceSales')
  // @ApiOperationSummary('Update/replace an existing sales.')
  // @ApiResponse(400, {description: 'Invalid sales.'})
  // @ApiResponse(404, {description: 'Sales not found.'})
  // @ApiResponse(200, {description: 'Sales successfully updated. Returns the sales.'})
  // @ValidatePathParam('salesId', {type: 'number'})
  // @ValidateBody(salesSchema)
  // async replaceSales(ctx: Context) {
  //   const sales = await Sales.findOneBy({id: ctx.request.params.salesId});
  //
  //   if (!sales) {
  //     return new HttpResponseNotFound();
  //   }
  //
  //   Object.assign(sales, ctx.request.body);
  //
  //   await Sales.save(sales);
  //
  //   return new HttpResponseOK(sales);
  // }
  //
  // @Delete('/:salesId')
  // @ApiOperationId('deleteSales')
  // @ApiOperationSummary('Delete a sales.')
  // @ApiResponse(404, {description: 'Sales not found.'})
  // @ApiResponse(204, {description: 'Sales successfully deleted.'})
  // @ValidatePathParam('salesId', {type: 'number'})
  // async deleteSales(ctx: Context) {
  //   const sales = await Sales.findOneBy({id: ctx.request.params.salesId});
  //
  //   if (!sales) {
  //     return new HttpResponseNotFound();
  //   }
  //
  //   await Sales.delete({id: ctx.request.params.salesId});
  //
  //   return new HttpResponseNoContent();
  // }

}
