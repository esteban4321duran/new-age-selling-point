// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ItemDescription extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  description:string;
  @Column()
  price:number;

}
