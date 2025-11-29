import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class Product extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title: string;
}
