import { formatCurrency } from "@/src/services/formatters"

type AmountProps = {
    label: string,
    amount : number
}

export default function Amount({ label, amount }: AmountProps) {
    return (
        <>
            
            <p className="text-gray-700 text-2xl font-black "> 
                {label}: 
                 <span className="font-bold text-amber-500 text-2xl"> {formatCurrency(amount)}</span></p>
        </>
    )
}