import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;
  @Column({unique: true})
  userId: number;
  @Column()
  password: string;

}

// This line is required. It will be used to create the SQL session table later in the tutorial.
export {DatabaseSession} from '@foal/typeorm';