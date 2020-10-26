import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class User extends Model<User> {

  @Column({allowNull:false, primaryKey:true, autoIncrement: true})
  id: number;

  @Column({allowNull:false, validate: {len: [5, 50]}})
  login: string;

  @Column({allowNull:false, validate: {len: [6, 50]}})
  password: string;

  @Column({allowNull:true})
  user_image: string;

}