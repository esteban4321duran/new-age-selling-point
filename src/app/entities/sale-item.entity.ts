// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Sales} from './sales.entity';
import {ItemDetails} from './item-details.entity';

@Entity()
export class SaleItem extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  quantity: number;
  @ManyToOne(type => ItemDetails, {nullable: false, eager: true})
  details: ItemDetails;
  @ManyToOne(type => Sales, sale => sale.items, {nullable: false, eager: false})
  sale: Sales;


}
