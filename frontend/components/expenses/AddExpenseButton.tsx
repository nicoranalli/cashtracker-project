'use client'

import { useRouter, useSearchParams } from 'next/navigation'


export default function AddExpenseButton() {
    
    const router = useRouter()

    const params = useSearchParams()
    console.log(params)

    return (
        <button type="button"
         className="bg-amber-500 text-white font-bold py-2 px-4 rounded-md hover:bg-amber-650"
        onClick={() => router.push(location.pathname + '?addExpense=true&showModal=true')}>
            Agregar gasto
        </button>
    )

}