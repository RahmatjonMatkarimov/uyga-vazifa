import { DataTypes } from "sequelize";
import { Column, Model, Table } from "sequelize-typescript";

@Table
export class Auth extends Model {
    @Column({
        allowNull: false,
        type: DataTypes.STRING
    })
    username: string;

    @Column({
        allowNull: false,
        type: DataTypes.STRING
    })
    email: string;

    @Column({
        allowNull: false,
        type: DataTypes.STRING
    })
    password: string;

    @Column({
        allowNull: false,
        type: DataTypes.ENUM('user', 'admin', 'superAdmin'),
        defaultValue: 'user'
    })
    role: 'user' | 'admin' | 'superAdmin'

    @Column({
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false
    })
    isVerify: boolean;

    @Column({
        allowNull: true,
        type: DataTypes.INTEGER
    })
    otp: number;

    @Column({
        allowNull: true,
        type: DataTypes.BIGINT
    })
    otp_time: bigint;
}
