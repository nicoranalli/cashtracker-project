import ProgressBar from "@/components/budget/ProgressBar";
import AddExpenseButton from "@/components/expenses/AddExpenseButton";
import ExpenseMenu from "@/components/expenses/ExpenseMenu";
import Amount from "@/components/ui/Amount";
import ModalContainer from "@/components/ui/ModalContainer";
import { getBudget } from "@/src/services/budget";
import { formatDate, formatCurrency } from "@/src/services/formatters";
import { Metadata } from "next";


export async function generateMetadata(
    { params }: { params: { id: string } },
): Promise<Metadata> {
    const budget = await getBudget(await params.id);

    return {
        title: `Gastos - ${budget.name}`,
    }
}

export default async function BudgetDetailsPage({ params }: { params: { id: string } }) {
    // Asegúrate de que params.id esté disponible
    if (!params?.id) {
        return <p>Error: No se proporcionó un ID de presupuesto.</p>;
    }

    // Llama a getBudget con el ID
    const budget = await getBudget(params.id);

    if (!budget) {
        return <p>Error: No se encontró el presupuesto.</p>;
    }

    const gastado = budget.expenses.reduce((total, expense) => total + +expense.amount, 0)
    const disponible = +budget.amount - +gastado
    const porcentaje = (+gastado / +budget.amount) * 100


    return (
        <>
            <div className='flex justify-between items-center '>
                <div>
                    <h1 className="font-black text-4xl text-purple-950">{budget.name}</h1>
                    <p className="text-xl font-bold">Administra tus {''} <span className="text-amber-500">gastos</span></p>
                </div>

                <AddExpenseButton />

            </div>

            {budget.expenses.length === 0 ? (
                <p className="text-gray-500 text-center py-20">No hay gastos registrados en este presupuesto.</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 mt-10">
                        <div >
                            <ProgressBar percentage={+porcentaje.toFixed(2)}  />
                        </div>

                        <div className="flex flex-col items-center justify-center md:items-start gap-3">
                            {<Amount
                                label='Presupuesto'
                                amount={+budget.amount}
                            />}
                            {<Amount
                                label='Disponible'
                                amount={disponible}
                            />}
                            {<Amount
                                label='Gastado'
                                amount={gastado}
                            />}


                        </div>
                    </div>

                    <div>
                        <h1 className="font-black text-4xl text-purple-950 mt-10 ">
                            Gastos del presupuesto
                        </h1>
                    </div>
                    <ul role="list" className="divide-y divide-gray-300 border shadow-lg mt-5 ">
                        {budget.expenses.map((expense) => (
                            <li key={expense.id} className="flex justify-between gap-x-6 p-5">
                                <div className="flex min-w-0 gap-x-4">
                                    <div className="min-w-0 flex-auto space-y-2">
                                        <p className="text-2xl font-semibold text-gray-900">
                                            {expense.name}
                                        </p>

                                        <p className="text-xl font-bold text-amber-500">
                                            {formatCurrency(+expense.amount)}
                                        </p>
                                        <p className='text-gray-500  text-sm'>
                                            Última actualización: <span className='font-bold'>{formatDate(expense.updatedAt)}</span>

                                        </p>
                                    </div>
                                </div>

                                {<ExpenseMenu
                                    expenseId={expense.id}
                                />}
                            </li>
                        ))}
                    </ul>
                </>
            )
            }

            <ModalContainer />


        </>
    );
}