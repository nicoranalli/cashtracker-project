import Link from 'next/link'

export default function NotFound() {
    return (
        <div className='flex flex-col items-center justify-center '>

            <div className='flex mx-auto space-y-5 flex-col items-center justify-center'>
                <h1 className="font-black text-4xl text-purple-950">No Encontrado</h1>
                <p className="text-xl font-bold">El Presupuesto que intentas acceder {''} <span className="text-amber-500">no existe</span></p>
                <Link href="/admin" className='bg-amber-500 px-10 py-2 rounded-lg text-white font-bold cursor-pointer inline-block'>Ir a Presupuestos</Link>
            </div>
        </div>

    )
}