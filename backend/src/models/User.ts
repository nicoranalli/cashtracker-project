import { Model, Table, DataType, Column, HasMany, Default, Unique, AllowNull } from 'sequelize-typescript';
import Budget from './Budget';

@Table({
    tableName: 'users',
    timestamps: true
})
class User extends Model {
    @AllowNull(false)
    @Column({
        type: DataType.STRING(50),
        allowNull: false
    })
    declare name: string;

    @AllowNull(false)
    @Unique(true)
    @Column({
        type: DataType.STRING(50),
        allowNull: false
    })
    declare email: string;

    @AllowNull
    @Column({
        type: DataType.STRING(6),
    })
    declare token: string;

    @AllowNull(false)
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare password: string;

    @Default(false)
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false
    })
    declare confirmed: boolean

    @HasMany(() => Budget, { onUpdate: 'CASCADE', onDelete: 'CASCADE' }) // One-to-many relationship
    declare budgets: Budget[];
}

export default User;