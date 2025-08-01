import { Table, Column, Model, DataType, HasMany, AllowNull, BelongsTo, ForeignKey} from 'sequelize-typescript';
import Expense from './Expense';
import User from './User';


@Table({
    tableName: 'budgets', // The name of the table in the database
    timestamps: true, // Se crearán campos createdAt y updatedAt automáticamente
  })
class Budget extends Model {

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

    @HasMany(() => Expense, {onUpdate: 'CASCADE', onDelete: 'CASCADE'}) // One-to-many relationship
    declare expenses: Expense[];

    @ForeignKey(() => User)
    declare userId: number;

    @BelongsTo(() => User)
    declare user: User;
}

export default Budget;