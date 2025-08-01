export default function ErrorMessage({ children }: { children: React.ReactNode }) {
    return (
        <p className=" text-center p-3 uppercase text-sm  font-bold bg-red-500 text-white rounded-md">{children}</p>
    )
}