import { DataTypes } from "sequelize";
import { Column, Model, Table } from "sequelize-typescript";

@Table
export class Product extends Model {
    @Column({
        allowNull: false,
        type: DataTypes.STRING
    })
    title: string;

    @Column({
        allowNull: false,
        type: DataTypes.STRING
    })
    description: string;

    @Column({
        allowNull: false,
        type: DataTypes.INTEGER
    })
    prise: number;

}
