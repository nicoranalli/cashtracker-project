import { Table, Column, Model, DataType, ForeignKey, BelongsTo, AllowNull } from "sequelize-typescript";
import Budget from "./Budget";
import e from "express";


@Table({
    tableName: 'expenses',
    timestamps: true
})
class Expense extends Model {
    @AllowNull(false)
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare name: string;
    
    @AllowNull(false)
    @Column({
        type: DataType.DECIMAL,
        allowNull: false
    })
    declare amount: number;

    @ForeignKey(() => Budget)
    declare budgetId: number;

    @BelongsTo(() => Budget)
    declare budget: Budget;
}


export default Expense;