import { DialogTitle } from "@headlessui/react";
import ExpenseForm from "./ExpenseForm";
import { useActionState, useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Expense } from "@/src/schemas";
import editExpenseAction from "@/actions/edit-expense-action";
import { toast } from "react-toastify";

type ExpenseFormData = Pick<Expense, "name" | "amount">;

export default function EditExpenseForm({ closeModal }: { closeModal: () => void }) {
  const [expense, setExpense] = useState<ExpenseFormData>()
  const [isLoading, setIsLoading] = useState(false) // Estado para controlar el loading
  const router = useRouter()


  const { id: budgetId } = useParams()!
  const searchParams = useSearchParams()
  const expenseId = searchParams.get('editExpenseId')!

  const editExpenseActionWithId = editExpenseAction.bind(null, { budgetId: +budgetId!, expenseId: +expenseId })
  const [state, formAction] = useActionState(editExpenseActionWithId, {
    errors: [],
    success: '',
  })

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_URL}/admin/api/budgets/${budgetId}/expenses/${expenseId}`

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setExpense(data)
      })

  })

  useEffect(() => {
    if (state.success) {
      toast.success(state.success)
      setIsLoading(true) 
      closeModal()// Activa el estado de loading antes de redirigir
      setTimeout(() => {
        router.push(`/admin/budgets/${budgetId}`) // Redirige después de un breve retraso
      }, 1000) // Ajusta el tiempo según sea necesario
    }
    if (state.errors.length > 0) {
      state.errors.forEach((error) => {
        toast.error(error)
      })
    }
  }, [state, budgetId, router, closeModal])

  return (
    <>
      <DialogTitle
        as="h3"
        className="font-black text-4xl text-purple-950 my-5"
      >
        Editar Gasto
      </DialogTitle>
      <p className="text-xl font-bold">Edita los detalles de un {''}
        <span className="text-amber-500">gasto</span>
      </p>
      <form
        action={formAction}
        className="bg-gray-100 shadow-lg rounded-lg p-10 mt-10 border"
        noValidate
      >

        <ExpenseForm expense={expense} />


        <input
          type="submit"
          className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
          value='Guardar Cambios'
        />

          {/* Muestra un spinner o mensaje de carga si isLoading es true */}
          {isLoading && (
                <div className="flex justify-center items-center mt-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
                </div>
            )}
      </form>
    </>
  )
}