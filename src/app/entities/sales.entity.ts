import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {SaleItem} from './sale-item.entity';

@Entity()
export class Sales extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('datetime')
  dateTime: Date;
  @Column({type: 'boolean', default: false})
  finished: boolean;
  @OneToMany(() => SaleItem, saleItem => saleItem.sale, {eager: true})
  items: SaleItem[]


}
