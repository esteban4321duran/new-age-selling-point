// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class ItemDetails extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  price: number;
  @Column()
  description: string;


}
