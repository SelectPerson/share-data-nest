import { Table, Column, Model } from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @Column
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column
  password: string;
}
