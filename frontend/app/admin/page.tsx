import BudgetMenu from '@/components/budget/BudgetMenu';
import Link from 'next/link'
import { getBudgets } from '@/src/services/budget';
import DeleteBudgetModal from '@/components/budget/DeleteBudgetModal';
import { formatCurrency, formatDate } from '@/src/services/formatters';





export default async function AdminPage() {

    const budgets = await getBudgets();

    return (
        <>
            <div className='flex flex-col-reverse md:flex-row md:justify-between items-center'>
                <div className='w-full md:w-auto'>
                    <h1 className="font-black text-4xl text-purple-950 my-5">Mis Presupuestos</h1>
                    <p className="text-xl font-bold">Maneja y administra tus {''}
                        <span className="text-amber-500">presupuestos</span>
                    </p>
                </div>
                <Link
                    href={'/admin/budgets/new'}
                    className='bg-amber-500 p-2 rounded-lg text-white font-bold w-full md:w-auto text-center'
                >
                    Crear Presupuesto
                </Link>
            </div>

            {budgets.length === 0 ? (

                <div className='border rounded-2xl shadow-lg max-w-sm mx-auto mt-10 '> 
                    <div className='flex flex-col items-center justify-center m-10'>
                        <p className="text-lg font-light m-auto ">No tienes presupuestos :(</p>
                        <Link
                            href={'/admin/budgets/new'}
                            className='text-amber-500 font-bold mt-2'
                        >
                            Crea uno aquí!
                        </Link>

                    </div>
                </div>


            ) : (

                <>
                <ul role="list" className="divide-y divide-gray-300 border rounded-2xl shadow-lg mt-10 ">
                    {budgets.map((budget) => (
                        <li key={budget.id} className="flex justify-between gap-x-6 p-5 ">
                            <div className="flex min-w-0 gap-x-4">
                                <div className="min-w-0 flex-auto space-y-2">
                                    <p className="text-sm font-semibold leading-6 text-gray-900">
                                        <Link href={`/admin/budgets/${budget.id}`}>
                                            {budget.name}
                                        </Link>
                                    </p>
                                    <p className="text-xl font-bold text-amber-500">
                                        {formatCurrency(+budget.amount)}
                                    </p>
                                    <p className='text-gray-500  text-sm'>
                                        Última actualización: <span className='font-bold'>{formatDate(budget.updatedAt)}</span>
                                    </p>
                                </div>
                            </div>
                            <div className="flex shrink-0 items-center gap-x-6">

                            </div>

                            <div>
                                <BudgetMenu budgetId={budget.id}/>
                            </div>
                        </li>
                    ))}
                </ul>
                <DeleteBudgetModal />
                </>
            )}
        </>
    );
}