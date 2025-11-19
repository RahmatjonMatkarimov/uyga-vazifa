import { DataTypes } from "sequelize";
import { Column, Model, Table } from "sequelize-typescript";
import { Role } from "src/shared/constants/role.enum";

@Table
export class Auth extends Model {
    @Column({ allowNull: false, type: DataTypes.STRING })
    username: string; 

    @Column({ allowNull: false, type: DataTypes.STRING })
    firstName: string;

    @Column({ allowNull: false, type: DataTypes.STRING })
    lastName: string;

    @Column({ allowNull: true, type: DataTypes.STRING })
    avatar: string;

    @Column({ allowNull: true, type: DataTypes.TEXT })
    bio: string; 

    @Column({ allowNull: false, unique: true, type: DataTypes.STRING })
    email: string;

    @Column({ allowNull: false, type: DataTypes.STRING })
    password: string;

    @Column({
        allowNull: false,
        type: DataTypes.ENUM(...Object.values(Role)),
        defaultValue: Role.User
    })
    role: Role;

    @Column({ allowNull: false, type: DataTypes.BOOLEAN, defaultValue: false })
    isVerify: boolean;

    @Column({ allowNull: true, type: DataTypes.INTEGER })
    otp: number;

    @Column({ allowNull: true, type: DataTypes.BIGINT })
    otp_time: bigint;

    @Column({ allowNull: true, type: DataTypes.STRING })
    facebook: string;

    @Column({ allowNull: true, type: DataTypes.STRING })
    instagram: string;

    @Column({ allowNull: true, type: DataTypes.STRING })
    twitter: string;
}
